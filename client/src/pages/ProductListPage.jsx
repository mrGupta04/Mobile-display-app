import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { formatCurrency, getProducts } from '../api';

const ProductListPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch {
        setError('Unable to load products right now.');
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900">Smartphones on EMI</h1>
      <p className="mt-2 text-sm text-gray-600">Choose a product and explore available EMI options.</p>

      {loading && <p className="mt-8 text-gray-600">Loading products...</p>}

      {error && !loading && (
        <div className="mt-8 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">{error}</div>
      )}

      {!loading && !error && (
        <section className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <Link
              key={product.id}
              to={`/products/${product.slug}`}
              className="block overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-200 transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <img src={product.imageUrl} alt={product.name} className="h-56 w-full object-cover" />
              <div className="space-y-3 p-4">
                <h2 className="text-lg font-semibold text-gray-900">{product.name}</h2>
                <p className="text-sm text-gray-600">{product.shortDescription}</p>
                <p className="text-sm font-medium text-gray-900">Starts at {formatCurrency(product.startingPrice)}</p>
                <p className="text-xs text-gray-500">{product.variantCount} variants available</p>
                <span className="inline-flex rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white">
                  View EMI Plans
                </span>
              </div>
            </Link>
          ))}
        </section>
      )}
    </main>
  );
};

export default ProductListPage;
