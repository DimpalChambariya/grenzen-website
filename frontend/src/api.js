const BASE_URL = import.meta.env.VITE_API_URL || "/api";

async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `Request failed (${res.status})`);
  }
  return res.json();
}

export const api = {
  company: () => request("/company"),
  categories: () => request("/categories"),
  products: (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    return request(`/products${qs ? `?${qs}` : ""}`);
  },
  product: (id) => request(`/products/${id}`),
  upcoming: () => request("/upcoming"),
  industries: () => request("/industries"),
  qualityProcess: () => request("/quality-process"),
  stats: () => request("/stats"),
  submitEnquiry: (payload) =>
    request("/enquiries", { method: "POST", body: JSON.stringify(payload) })
};
