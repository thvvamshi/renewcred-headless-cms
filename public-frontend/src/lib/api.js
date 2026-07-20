const API_URL =
  process.env.INTERNAL_API_URL ??
  process.env.NEXT_PUBLIC_API_URL ??
  " https://renewcred-headless-cms.onrender.com/api/v1";

/**
 * Fetch all published pages
 */
export async function getPages() {
  try {
    const response = await fetch(`${API_URL}/content/pages`, {
      cache: "no-store",
    });

    if (!response.ok) {
      console.error(`Failed to fetch pages. Status: ${response.status}`);
      return [];
    }

    const payload = await response.json();

    return payload.pages ?? [];
  } catch (error) {
    console.error("CMS API Error:", error);
    return [];
  }
}

/**
 * Fetch a single page by slug
 */
export async function getPageBySlug(slug) {
  try {
    const response = await fetch(`${API_URL}/content/pages/${slug}`, {
      cache: "no-store",
    });

    if (!response.ok) {
      console.error(
        `Failed to fetch page "${slug}". Status: ${response.status}`,
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
