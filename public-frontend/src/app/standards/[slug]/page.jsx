import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import StandardsShell from "../../../components/StandardsShell";
import { getPageBySlug } from "../../../lib/api";

export default async function StandardsPage({ params }) {
  const { slug } = await params;

  const page = await getPageBySlug(slug);

  return (
    <>
      <Header />

      {page ? (
        <StandardsShell page={page} />
      ) : (
        <main className="mx-auto min-h-[60vh] max-w-5xl px-6 py-32">
          <p className="mb-4 inline-flex rounded-full border border-line bg-white px-4 py-2 text-sm font-semibold text-renew">
            Standards
          </p>

          <h1 className="text-5xl font-semibold">
            Content unavailable
          </h1>

          <p className="mt-5 max-w-xl text-lg leading-8 text-softInk">
            Unable to load content from the CMS API.
            <br />
            Make sure the backend is running and the page exists.
          </p>
        </main>
      )}

      <Footer />
    </>
  );
}