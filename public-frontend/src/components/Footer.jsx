import Image from "next/image";
import { Clock3, Lock, Mail, MapPin } from "lucide-react";

const links = ["Buyer", "Supplier", "Climate & Us", "Science", "Standards", "Contact Us"];
const legal = ["Privacy Policy", "Terms & Conditions", "Support"];

export default function Footer() {
  return (
    <footer className="mt-[104px] rounded-t-[54px] bg-footer px-5 py-[76px] text-white sm:rounded-t-[66px] lg:px-[78px]">
      <div className="mx-auto max-w-[1324px]">
        <div className="grid gap-12 border-b border-white/55 pb-[48px] lg:grid-cols-[1.1fr_0.75fr_1fr] lg:gap-16">
          <div>
            <a href="/standards/ev" className="relative mb-8 block h-10 w-[178px]">
              <Image src="/assets/renewcred-logo-light.svg" alt="RenewCred" fill className="object-contain object-left" />
            </a>
            <ul className="space-y-1.5 text-[13px] leading-5 text-white/82">
              <li className="flex items-start gap-2">
                <MapPin size={17} className="mt-1 shrink-0" />
                Indiranagar, Bengaluru, Karnataka, INDIA
              </li>
              <li className="flex items-center gap-2">
                <Mail size={17} />
                yp@renewcred.com
              </li>
              <li className="flex items-center gap-2">
                <Clock3 size={17} />
                There is no time to save the planet
              </li>
              <li>CIN No.: XXXXXXXXX</li>
            </ul>
            <div className="mt-7 flex gap-6 text-[14px] font-bold text-white">
              <a href="#" aria-label="Facebook">f</a>
              <a href="#" aria-label="X">X</a>
              <a href="#" aria-label="LinkedIn">in</a>
              <a href="#" aria-label="Instagram">ig</a>
            </div>
          </div>

          <nav className="space-y-3 text-[14px] text-white/88">
            {links.map((link) => (
              <a key={link} href={link === "Standards" ? "/standards/ev" : "#"} className="block transition hover:text-white">
                {link}
              </a>
            ))}
          </nav>

          <form className="max-w-[520px]">
            <p className="mb-4 flex items-center gap-3 text-[18px] italic leading-7 text-white/88">
              <Lock size={18} />
              No spam. Just pure climate intelligence.
            </p>
            <label className="sr-only" htmlFor="subscribe-email">Email address</label>
            <input
              id="subscribe-email"
              type="email"
              placeholder="Your Email Address Please!"
              className="h-[52px] w-full rounded-full border border-white/50 bg-white px-6 text-[16px] text-ink outline-none placeholder:text-[#b8b8b8]"
            />
            <button type="button" className="mt-6 rounded-full bg-renew px-7 py-3.5 text-[15px] font-bold text-white transition hover:bg-red-700">
              Subscribe
            </button>
          </form>
        </div>

        <div className="flex flex-col gap-6 pt-8 text-[11px] italic text-white/78 md:flex-row md:items-center md:justify-between">
          <p>Copyright (c) 2025 Renewred. All rights reserved.</p>
          <nav className="flex flex-wrap gap-9">
            {legal.map((item) => (
              <a key={item} href="#" className="transition hover:text-white">
                {item}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
