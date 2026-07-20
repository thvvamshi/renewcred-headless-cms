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

      <main className="min-h-screen">
        <section className="mx-auto max-w-7xl px-6 py-10">
          <StandardBadge />

          <h4 className="mt-3 text-2xl font-semibold lg:text-3xl">
            RenewCred Standards
          </h4>

          <p className="mt-2 max-w-3xl text-lg leading-1 text-zinc-400 text-[15px]">
            Lorem ipsum dolor sit amet consectetur. Gravida faucibus commodo leo
            eget commodo. Sit quis dolor non sed enim scelerisque.
          </p>

          <div className="mt-3 border-t border-zinc-800" />

          {standards.length === 0 ? (
            <div className="py-24 text-center text-zinc-500">
              No standards found.
            </div>
          ) : (
            <div>
              {standards.map((page) => (
                <Link
                  key={page._id}
                  href={`/standards/${page.slug}`}
                  className="block border-b border-zinc-800 py-12 transition-colors hover:bg-zinc-50"
                >
                  <div className="flex items-start justify-between gap-8">
                    <div className="flex-1">
                      <h2 className="text-3xl font-semibold">{page.title}</h2>

                      <p className="mt-6 max-w-4xl leading-8 text-zinc-400">
                        {page.summary || "No description available."}
                      </p>
                    </div>

                    <span className="whitespace-nowrap hover:text-red-500">
                      Read More →
                    </span>
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
