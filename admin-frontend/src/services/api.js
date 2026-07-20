const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api/v1";

export async function apiRequest(path, options = {}, token) {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
  });

  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(payload.message || "Request failed");
  }

  return payload;
}

export function deletePage(id, token) {
  return apiRequest(
    `/content/admin/pages/${id}`,
    {
      method: "DELETE",
    },
    token
  );
}