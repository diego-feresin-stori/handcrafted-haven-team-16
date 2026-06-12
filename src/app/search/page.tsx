import { featuredProducts, type Product } from '@/lib/placeholder-products';
import Link from 'next/link';

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = q?.toLowerCase().trim() || '';

  let results: Product[] = featuredProducts;

  if (query) {
    results = featuredProducts.filter((product) =>
      product.name.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query) ||
      product.alt.toLowerCase().includes(query)
    );
  }

  return (
    <div className="section">
      <div className="container">
        <h1 className="sectionTitle">
          {query ? `Search Results for "${q}"` : "All Products"}
        </h1>

        <p className="sectionSubtitle" style={{ marginBottom: '2rem' }}>
          Found {results.length} product{results.length !== 1 ? 's' : ''}
        </p>

        {results.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem 0' }}>
            <p>No products found for "{q}". Try different keywords.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {results.map((product) => (
              <div
                key={product.id}
                className="group border border-gray-200 rounded-2xl overflow-hidden hover:shadow-md transition-all duration-300 bg-white"
              >
                <div className="h-64 bg-gray-100 relative flex items-center justify-center overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="eager"
                  />
                </div>

                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-semibold">{product.name}</h3>
                    <span className="text-sm font-medium text-[var(--color-sage)]">
                      {product.category}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 mb-4">
                    {'★'.repeat(Math.floor(product.rating))}
                    <span className="text-sm text-gray-500">({product.rating})</span>
                  </div>

                  <p className="text-3xl font-bold text-[var(--color-terracotta)] mb-6">
                    ${product.price}
                  </p>

                  <Link
                    href={`/products/${product.id}`}
                    className="block w-full text-center py-3 border-2 border-[var(--color-sage)] text-[var(--color-sage)] font-medium rounded-xl hover:bg-[var(--color-sage)] hover:text-white transition-colors"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}