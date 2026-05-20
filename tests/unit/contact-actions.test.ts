import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// Mock next/headers so the server action can run outside the Next runtime.
// Each test sets `currentIp` so the module-level rate-limit map sees a fresh
// key and tests don't bleed into each other.
let currentIp = "1.2.3.4";
vi.mock("next/headers", () => ({
  headers: async () => ({
    get: (name: string) =>
      name === "x-forwarded-for" ? currentIp : null,
  }),
}));

vi.mock("next/navigation", () => ({
  redirect: (url: string) => {
    // Mirror Next's behavior: redirect throws to halt the action.
    throw new Error(`REDIRECT:${url}`);
  },
}));

import { sendContactMessage } from "@/app/contact/actions";

const validPayload = {
  name: "Ada Lovelace",
  email: "ada@example.com",
  message: "Hi — interested in working together.",
  website: "",
};

let ipCounter = 0;
const freshIp = () => `10.0.0.${++ipCounter}`;

beforeEach(() => {
  currentIp = freshIp();
  delete process.env.RESEND_API_KEY;
  delete process.env.CONTACT_TO_EMAIL;
  delete process.env.CONTACT_FROM_EMAIL;
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe("sendContactMessage", () => {
  it("returns mailto mode when backend env is not configured", async () => {
    const result = await sendContactMessage(validPayload);
    expect(result).toEqual({ ok: true, mode: "mailto" });
  });

  it("silently fake-successes when the honeypot is filled", async () => {
    const result = await sendContactMessage({
      ...validPayload,
      website: "https://spam.example.com",
    });
    expect(result).toEqual({ ok: true, mode: "sent" });
  });

  it("rejects when any required field is missing", async () => {
    const result = await sendContactMessage({ ...validPayload, name: "  " });
    expect(result).toEqual({ ok: false, error: "All fields are required." });
  });

  it("rejects invalid email addresses", async () => {
    const result = await sendContactMessage({ ...validPayload, email: "not-an-email" });
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error).toMatch(/valid email/i);
  });

  it("rejects names longer than 200 chars", async () => {
    const result = await sendContactMessage({ ...validPayload, name: "a".repeat(201) });
    expect(result).toEqual({ ok: false, error: "Name is too long." });
  });

  it("rejects messages longer than 5000 chars", async () => {
    const result = await sendContactMessage({ ...validPayload, message: "x".repeat(5001) });
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error).toMatch(/too long/i);
  });

  it("rate-limits after the 4th attempt from the same IP", async () => {
    currentIp = freshIp();
    for (let i = 0; i < 3; i++) {
      const r = await sendContactMessage(validPayload);
      expect(r.ok).toBe(true);
    }
    const blocked = await sendContactMessage(validPayload);
    expect(blocked).toEqual({
      ok: false,
      error: "Too many requests. Please try again later.",
    });
  });

  it("calls Resend with the expected payload when env is configured", async () => {
    process.env.RESEND_API_KEY = "test-key";
    process.env.CONTACT_TO_EMAIL = "to@example.com";
    process.env.CONTACT_FROM_EMAIL = "from@example.com";

    const fetchSpy = vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify({ id: "msg_1" }), { status: 200 })
    );

    const result = await sendContactMessage(validPayload);
    expect(result).toEqual({ ok: true, mode: "sent" });

    expect(fetchSpy).toHaveBeenCalledOnce();
    const [url, init] = fetchSpy.mock.calls[0];
    expect(url).toBe("https://api.resend.com/emails");
    const body = JSON.parse((init as RequestInit).body as string);
    expect(body).toMatchObject({
      from: "from@example.com",
      to: ["to@example.com"],
      reply_to: ["ada@example.com"],
    });
    expect(body.subject).toContain("Ada Lovelace");
  });

  it("surfaces a friendly error when Resend responds non-2xx", async () => {
    process.env.RESEND_API_KEY = "test-key";
    process.env.CONTACT_TO_EMAIL = "to@example.com";
    process.env.CONTACT_FROM_EMAIL = "from@example.com";

    vi.spyOn(console, "error").mockImplementation(() => {});
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response("nope", { status: 500 })
    );

    const result = await sendContactMessage(validPayload);
    expect(result).toEqual({
      ok: false,
      error: "Mail delivery failed. Please try again later.",
    });
  });

  it("surfaces a friendly error when fetch throws", async () => {
    process.env.RESEND_API_KEY = "test-key";
    process.env.CONTACT_TO_EMAIL = "to@example.com";
    process.env.CONTACT_FROM_EMAIL = "from@example.com";

    vi.spyOn(console, "error").mockImplementation(() => {});
    vi.spyOn(globalThis, "fetch").mockRejectedValue(new Error("network down"));

    const result = await sendContactMessage(validPayload);
    expect(result).toEqual({
      ok: false,
      error: "Network error. Please try again later.",
    });
  });
});
