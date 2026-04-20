import Link from "next/link";
import { CodeXml } from "lucide-react";

export function Header() {
  return (
    <header className="fixed top-0 left-0 z-50 w-full mix-blend-difference py-4 md:py-6 pointer-events-none text-white">
      <div className="container mx-auto px-4 md:px-12 flex items-center justify-between pointer-events-auto">
        <Link href="/" className="flex items-center gap-2 group">
          <CodeXml className="w-6 h-6 md:w-8 md:h-8 transition-transform group-hover:scale-95 duration-500 ease-out" />
          <span className="font-sans font-bold text-lg md:text-xl tracking-tighter uppercase leading-none mt-1 hidden sm:block">
            <span className="opacity-50">Dev/</span>Motion
          </span>
        </Link>
        <nav className="flex gap-4 md:gap-8 items-center">
          {["Work", "Studio", "Contact"].map((item) => (
            <Link
              key={item}
              href={item === "Work" ? "/projects" : (item === "Studio" ? "/about" : `/${item.toLowerCase()}`)}
              className="font-sans font-medium text-xs md:text-sm tracking-wide uppercase hover:opacity-50 transition-opacity relative group"
            >
              <span>{item}</span>
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
