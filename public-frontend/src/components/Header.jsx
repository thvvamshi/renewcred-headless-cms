import Image from "next/image";
import { ChevronDown, Menu } from "lucide-react";

const navItems = [
  "Buyers",
  "Suppliers",
  "Climate & Us",
  "Science",
  "Standards",
  "Contact Us"
];

export default function Header() {
  return (
    <header className="px-4 pt-[18px] sm:px-8 lg:px-[58px]">
      <nav className="mx-auto flex h-[66px] max-w-[1324px] items-center justify-between rounded-[13px] border border-line bg-white/90 px-5 shadow-nav backdrop-blur md:px-6">
        <a href="/standards/ev" aria-label="RenewCred home" className="relative h-8 w-[122px] shrink-0">
          <Image src="/assets/renewcred-logo-dark.svg" alt="RenewCred" fill priority className="object-contain object-left" />
        </a>

        <div className="hidden items-center gap-[27px] text-[13px] font-semibold text-ink lg:flex">
          {navItems.map((item) => (
            <a
              key={item}
              href={item === "Standards" ? "/standards/" : "#"}
              className={`inline-flex items-center gap-1 transition hover:text-renew ${item === "Standards" ? "text-renew" : ""}`}
            >
              {item}
              {item === "Climate & Us" || item === "Science" ? <ChevronDown size={15} strokeWidth={2.4} /> : null}
            </a>
          ))}
        </div>

        <a
          href="#"
          className="hidden h-[42px] items-center rounded-[7px] border border-ink/70 px-[22px] text-[13px] font-semibold text-ink transition hover:border-renew hover:text-renew md:inline-flex"
        >
          Registry
        </a>

        <button type="button" className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-line lg:hidden" aria-label="Open menu">
          <Menu size={20} />
        </button>
      </nav>
    </header>
  );
}
