import { BrowserRouter, Link, Navigate, Route, Routes } from 'react-router-dom'
import ProductListPage from './pages/ProductListPage'
import ProductPage from './pages/ProductPage'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 text-gray-900">
        <header className="sticky top-0 z-30 border-b border-indigo-100/70 bg-white/80 backdrop-blur">
          <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
            <Link to="/products" className="group inline-flex items-center gap-3">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-sm font-bold text-white shadow-sm transition group-hover:bg-indigo-700">
                1F
              </span>
              <span>
                <span className="block text-base font-bold tracking-tight text-gray-900">1Fi Mobile Store</span>
                <span className="block text-xs text-gray-500">Easy EMIs for flagship smartphones</span>
              </span>
            </Link>

            <div className="flex items-center gap-2">
              <span className="hidden rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700 sm:inline-flex">
                Trusted Plans
              </span>
              <Link
                to="/products"
                className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 transition hover:border-gray-400 hover:text-gray-900"
              >
                Browse Products
              </Link>
            </div>
          </div>
        </header>

        <Routes>
          <Route path="/" element={<Navigate to="/products" replace />} />
          <Route path="/products" element={<ProductListPage />} />
          <Route path="/products/:slug" element={<ProductPage />} />
        </Routes>

        <footer className="mt-12 border-t border-gray-200 bg-white">
          <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-8 px-4 py-8 sm:px-6 md:grid-cols-3 lg:px-8">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-gray-500">1Fi Mobile Store</p>
              <p className="mt-2 text-sm text-gray-600">
                Compare smartphone variants, pick the best EMI plan, and proceed in seconds.
              </p>
            </div>

            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-gray-500">Quick Links</p>
              <div className="mt-2 flex flex-col gap-2">
                <Link to="/products" className="text-sm text-gray-700 transition hover:text-indigo-700">
                  All Products
                </Link>
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-gray-500">Note</p>
              <p className="mt-2 text-sm text-gray-600">
                EMI amounts shown are indicative and subject to lender eligibility and final approval.
              </p>
            </div>
          </div>

          <div className="border-t border-gray-200 px-4 py-4 text-center text-xs text-gray-500 sm:px-6 lg:px-8">
            © {new Date().getFullYear()} 1Fi Assignment Demo. All rights reserved.
          </div>
        </footer>
      </div>
    </BrowserRouter>
  )
}

export default App
