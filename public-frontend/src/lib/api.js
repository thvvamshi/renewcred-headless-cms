const API_URL =
  process.env.INTERNAL_API_URL ??
  process.env.NEXT_PUBLIC_API_URL ??
  "http://localhost:4000/api/v1";

export async function getPageBySlug(slug) {
  try {
    const response = await fetch(`${API_URL}/content/pages/${slug}`, {
      cache: "no-store",
    });

    if (!response.ok) {
      console.error(
        `Failed to fetch page "${slug}". Status: ${response.status}`
      );
      return null;
    }

    const payload = await response.json();

    return payload.page ?? null;
  } catch (error) {
    console.error("CMS API Error:", error);
    return null;
  }
}