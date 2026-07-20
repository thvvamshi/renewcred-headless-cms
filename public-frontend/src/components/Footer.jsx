import Image from "next/image";
import Link from "next/link";
import {
  Clock3,
  Facebook,
  Instagram,
  Linkedin,
  Lock,
  Mail,
  MapPin,
  Twitter,
} from "lucide-react";

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
    <footer className="mt-8 overflow-hidden rounded-t-[56px] bg-[#2F2F2F] text-white">
      <div className="mx-auto max-w-[1180px] px-5 pt-10 pb-5 lg:px-8">
        {/* Top */}

        <div className="grid grid-cols-1 gap-8 border-b border-white/20 pb-6 md:grid-cols-12">
          {/* Left */}

          <div className="md:col-span-5">
            <Link
              href="/"
              className="relative mb-5 block h-7 w-[130px]"
            >
              <Image
                src="/assets/renewcred-logo-light.svg"
                alt="RenewCred"
                fill
                className="object-contain object-left"
              />
            </Link>

            <ul className="space-y-1 text-[12px] leading-[18px] text-white/75">
              <li className="flex items-start gap-2">
                <MapPin size={12} className="mt-[2px] shrink-0" />
                <span>Indiranagar, Bengaluru, Karnataka, INDIA</span>
              </li>

              <li className="flex items-center gap-2">
                <Mail size={12} />
                yp@renewcred.com
              </li>

              <li className="flex items-center gap-2">
                <Clock3 size={12} />
                There is no time to save the planet
              </li>

              <li>CIN No.: XXXXXXXX</li>
            </ul>

            <div className="mt-4 flex items-center gap-2.5">
              <a href="#" className="text-white/70 hover:text-white transition">
                <Facebook size={13} />
              </a>

              <a href="#" className="text-white/70 hover:text-white transition">
                <Twitter size={13} />
              </a>

              <a href="#" className="text-white/70 hover:text-white transition">
                <Linkedin size={13} />
              </a>

              <a href="#" className="text-white/70 hover:text-white transition">
                <Instagram size={13} />
              </a>
            </div>
          </div>

          {/* Center */}

          <div className="md:col-span-2 md:pl-4">
            <nav>
              <ul className="space-y-2 text-[12px] text-white/75">
                {links.map((link) => (
                  <li key={link}>
                    <Link
                      href={link === "Standards" ? "/standards" : "#"}
                      className="transition hover:text-white"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Right */}

          <div className="md:col-span-5 md:justify-self-end w-full max-w-[360px]">
            <p className="mb-3 flex items-center gap-2 text-[13px] italic text-white/90">
              <Lock size={13} />
              No spam. Just pure climate intelligence.
            </p>

            <input
              type="email"
              placeholder="Your Email Address Please!"
              className="
                h-9
                w-full
                rounded-full
                border
                border-white/15
                bg-white
                px-4
                text-[12px]
                text-[#2F2F2F]
                placeholder:text-[#B9B9B9]
                outline-none
                transition
                focus:border-[#C3202F]
              "
            />

            <button
              className="
                mt-3
                h-8
                rounded-full
                bg-[#C3202F]
                px-5
                text-[12px]
                font-medium
                transition
                hover:bg-[#AA1C29]
              "
            >
              Subscribe
            </button>
          </div>
        </div>

        {/* Bottom */}

        <div className="mt-4 flex flex-col gap-2 text-[9px] text-white/55 md:flex-row md:items-center md:justify-between">
          <p>Copyright © 2025 RenewCred. All rights reserved.</p>

          <nav className="flex flex-wrap gap-4">
            {legal.map((item) => (
              <Link
                key={item}
                href="#"
                className="transition hover:text-white"
              >
                {item}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}