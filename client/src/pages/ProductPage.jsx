import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { formatCurrency, getProductBySlug } from '../api';

const ProductPage = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [variantId, setVariantId] = useState('');
  const [selectedPlanId, setSelectedPlanId] = useState('');
  const [selectedImage, setSelectedImage] = useState('');

  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true);
      setError('');

      try {
        const data = await getProductBySlug(slug);
        setProduct(data);

        const firstVariant = data.variants?.[0];
        setVariantId(firstVariant?._id || '');
        setSelectedPlanId(firstVariant?.emiPlans?.[0]?._id || '');
        setSelectedImage(firstVariant?.images?.[0] || firstVariant?.imageUrl || '');
      } catch {
        setError('Unable to load this product.');
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [slug]);

  const currentVariant = useMemo(() => {
    if (!product) {
      return null;
    }

    return product.variants.find((variant) => variant._id === variantId) || product.variants[0];
  }, [product, variantId]);

  const currentPlan = useMemo(() => {
    if (!currentVariant) {
      return null;
    }

    return (
      currentVariant.emiPlans.find((plan) => plan._id === selectedPlanId) || currentVariant.emiPlans[0] || null
    );
  }, [currentVariant, selectedPlanId]);

  const onVariantChange = (nextVariantId) => {
    setVariantId(nextVariantId);
    const variant = product?.variants.find((item) => item._id === nextVariantId);
    setSelectedPlanId(variant?.emiPlans?.[0]?._id || '');
    setSelectedImage(variant?.images?.[0] || variant?.imageUrl || '');
  };

  useEffect(() => {
    if (!currentVariant) {
      return;
    }

    const variantImages = currentVariant.images?.length ? currentVariant.images : [currentVariant.imageUrl];

    if (!selectedImage || !variantImages.includes(selectedImage)) {
      setSelectedImage(variantImages[0]);
    }
  }, [currentVariant, selectedImage]);

  const onProceed = () => {
    if (!currentPlan || !currentVariant) {
      return;
    }

    window.alert(
      `Proceeding with ${product.name} (${currentVariant.name}) on ${currentPlan.tenureMonths} months EMI at ${currentPlan.interestRate}% interest.`
    );
  };

  if (loading) {
    return (
      <main className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <p className="text-gray-600">Loading product...</p>
      </main>
    );
  }

  if (error || !product) {
    return (
      <main className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <Link to="/products" className="text-sm font-medium text-indigo-600 hover:text-indigo-700">
          ← Back to products
        </Link>
        <div className="mt-6 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">{error}</div>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <Link to="/products" className="text-sm font-medium text-indigo-600 hover:text-indigo-700">
        ← Back to products
      </Link>

      <section className="mt-4 grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div>
          <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-200">
            <img
              src={selectedImage || currentVariant?.imageUrl}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="hide-scrollbar mt-3 flex gap-2 overflow-x-auto pb-1 sm:grid sm:grid-cols-5 sm:overflow-visible sm:pb-0">
            {(currentVariant?.images?.length ? currentVariant.images : [currentVariant?.imageUrl])
              .slice(0, 5)
              .map((imageUrl, imageIndex) => {
                const isActive = imageUrl === selectedImage;

                return (
                  <button
                    key={`${currentVariant?._id || 'variant'}-${imageIndex}`}
                    type="button"
                    onClick={() => setSelectedImage(imageUrl)}
                    className={`w-16 flex-none overflow-hidden rounded-lg border transition sm:w-auto ${
                      isActive ? 'border-indigo-600 ring-2 ring-indigo-200' : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <img src={imageUrl} alt={`${product.name} view ${imageIndex + 1}`} className="h-16 w-full object-cover" />
                  </button>
                );
              })}
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>
            <p className="mt-1 text-sm text-gray-600">{product.shortDescription}</p>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500">Variant</h2>
            <div className="mt-2 flex flex-wrap gap-2">
              {product.variants.map((variant) => {
                const active = variant._id === currentVariant?._id;

                return (
                  <button
                    key={variant._id}
                    type="button"
                    onClick={() => onVariantChange(variant._id)}
                    className={`rounded-lg border px-3 py-2 text-sm font-medium transition ${
                      active
                        ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                        : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                    }`}
                  >
                    {variant.name}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-gray-200">
            <p className="text-sm text-gray-500 line-through">MRP: {formatCurrency(currentVariant?.mrp || 0)}</p>
            <p className="mt-1 text-2xl font-bold text-gray-900">{formatCurrency(currentVariant?.price || 0)}</p>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500">EMI Plans</h2>
            <div className="mt-3 space-y-3">
              {(currentVariant?.emiPlans || []).map((plan) => {
                const active = plan._id === currentPlan?._id;

                return (
                  <button
                    key={plan._id}
                    type="button"
                    onClick={() => setSelectedPlanId(plan._id)}
                    className={`w-full rounded-xl border p-4 text-left transition ${
                      active
                        ? 'border-indigo-600 bg-indigo-50 ring-1 ring-indigo-200'
                        : 'border-gray-300 bg-white hover:border-gray-400'
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="text-lg font-semibold text-gray-900">{formatCurrency(plan.monthlyPayment)}/month</p>
                      <p className="text-sm text-gray-700">{plan.tenureMonths} months</p>
                    </div>
                    <p className="mt-1 text-sm text-gray-600">Interest: {plan.interestRate}%</p>
                    <p className="mt-1 text-sm text-gray-600">Backed by: {plan.fundName || 'Axis Mutual Fund'}</p>
                    <p className="mt-1 text-sm text-gray-600">
                      Cashback: {plan.cashback > 0 ? formatCurrency(plan.cashback) : 'Not available'}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          <button
            type="button"
            onClick={onProceed}
            disabled={!currentPlan}
            className="w-full rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-gray-400"
          >
            Proceed with Selected Plan
          </button>
        </div>
      </section>
    </main>
  );
};

export default ProductPage;
