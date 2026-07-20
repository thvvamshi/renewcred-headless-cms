import Image from "next/image";
import { Clock3, Lock, Mail, MapPin } from "lucide-react";

const links = [
  "Buyer",
  "Supplier",
  "Climate & Us",
  "Science",
  "Standards",
  "Contact Us",
];

const legal = ["Privacy Policy", "Terms & Conditions", "Support"];

export default function Footer() {
  return (
    <footer className="mt-[10px] overflow-hidden rounded-t-[80px] bg-[#2B2C2C] text-white">
      <div className="mx-auto max-w-[1920px] px-[104px] pt-[80px] pb-[40px]">
        <div className="grid gap-[40px] border-b border-white/40 pb-[48px] lg:grid-cols-[430px_220px_520px] lg:justify-between">
          {/* Left */}

          <div>
            <a
              href="/standards"
              className="relative mb-3 block h-[46px] w-[220px]"
            >
              <Image
                src="/assets/renewcred-logo-light.svg"
                alt="RenewCred"
                fill
                className="object-contain object-left"
              />
            </a>

            <ul className="space-y-[6px] text-[16px] leading-[30px] text-white/85">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="mt-1 shrink-0" />
                <span>Indiranagar, Bengaluru, Karnataka, INDIA</span>
              </li>

              <li className="flex items-center gap-3">
                <Mail size={18} />
                yp@renewcred.com
              </li>

              <li className="flex items-center gap-3">
                <Clock3 size={18} />
                There is no time to save the planet
              </li>

              <li>CIN No.: XXXXXXXXX</li>
            </ul>

            <div className="mt-2 flex gap-5 text-[18px] font-semibold text-white">
              <a href="#">f</a>

              <a href="#">X</a>

              <a href="#">in</a>

              <a href="#">ig</a>
            </div>
          </div>

          {/* Center */}

          <nav className="space-y-[15px] pt-1 text-[15px] font-medium text-white/90">
            {links.map((link) => (
              <a
                key={link}
                href={link === "Standards" ? "/standards" : "#"}
                className="block transition hover:text-white"
              >
                {link}
              </a>
            ))}
          </nav>

          {/* Right */}

          <form className="w-full max-w-[506px]">
            <p className="mb-5 flex items-center gap-3 text-[18px] italic leading-[32px] text-white/90">
              <Lock size={18} />
              No spam. Just pure climate intelligence.
            </p>

            <label htmlFor="subscribe-email" className="sr-only">
              Email Address
            </label>

            <input
              id="subscribe-email"
              type="email"
              placeholder="Your Email Address Please!"
              className="h-[50px] w-full rounded-full border border-[#D9D9D9] bg-white px-8 text-[18px] text-[#2B2C2C] outline-none placeholder:text-[#BDBDBD]"
            />

            <button
              type="button"
              className="mt-3 h-[42px] w-[136px] rounded-full bg-[#C3202F] text-[15px] font-semibold transition hover:bg-[#A91B28]"
            >
              Subscribe
            </button>
          </form>
        </div>
        {/* Bottom */}

        <div
          className="
            flex
            flex-col
            gap-2
            pt-[10px]

            text-[12px]
            italic
            text-white/75

            md:flex-row
            md:items-center
            md:justify-between
          "
        >
          <p>Copyright © 2025 RenewCred. All rights reserved.</p>

          <nav className="flex flex-wrap gap-[10px]">
            {legal.map((item) => (
              <a
                key={item}
                href="#"
                className="transition duration-200 hover:text-white"
              >
                {item}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
