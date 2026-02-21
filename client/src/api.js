const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000';

const fetchJson = async (path) => {
  const response = await fetch(`${API_BASE_URL}${path}`);

  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }

  return response.json();
};

export const getProducts = () => fetchJson('/api/products');

export const getProductBySlug = (slug) => fetchJson(`/api/products/${slug}`);

export const formatCurrency = (value) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value);
