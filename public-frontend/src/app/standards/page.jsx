import Link from "next/link";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import StandardBadge from "../../components/StandardBadge";

import { getPages } from "../../lib/api";

export default async function StandardsPage() {
  const standards = await getPages();

  return (
    <>
      <Header />

      <main>
        <section className="mx-auto w-full max-w-[1440px] px-6 py-8 md:px-10 lg:px-16 lg:py-12">
          <StandardBadge />

          <h1 className="mt-2 text-[20px] font-semibold leading-[1.1] tracking-[-0.03em] text-zinc-900 md:text-[20px] lg:text-[28px]">
            RenewCred Standards
          </h1>

          <p className="mt-2 max-w-[560px] text-[14px] leading-[22px] text-zinc-500">
            Lorem ipsum dolor sit amet consectetur. Gravida faucibus commodo leo
            eget commodo. Sit quis dolor non sed enim scelerisque.
          </p>

          <div className="mt-6 border-t border-zinc-200" />

          {standards.length === 0 ? (
            <div className="py-20 text-center text-zinc-500">
              No standards found.
            </div>
          ) : (
            <div>
              {standards.map((page) => (
                <Link
                  key={page._id}
                  href={`/standards/${page.slug}`}
                  className="group block border-b border-zinc-200 py-6 transition-colors duration-200 hover:bg-zinc-50"
                >
                  <div className="grid grid-cols-12 gap-y-4 gap-x-8">
                    {/* Left */}
                    <div className="col-span-12 lg:col-span-9">
                      <h2 className="text-[20px] font-semibold leading-[28px] tracking-[-0.02em] text-zinc-900 transition-colors duration-200 group-hover:text-[#C3202F]">
                        {page.title}
                      </h2>

                      <p className="mt-3 max-w-[920px] text-[13px] leading-[24px] text-zinc-500">
                        {page.summary || "No description available."}
                      </p>
                    </div>

                    {/* Right */}
                    <div className="col-span-12 flex items-start lg:col-span-3 lg:justify-end">
                      <span className="mt-1 whitespace-nowrap text-[14px] font-medium text-zinc-700 transition-all duration-200 group-hover:translate-x-1 group-hover:text-[#C3202F]">
                        Read more →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </>
  );
}