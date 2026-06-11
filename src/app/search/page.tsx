'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

const placeholderProducts = [
  { id: 1, name: "Wooden Cutting Board", category: "Kitchen", price: 45 },
  { id: 2, name: "Ceramic Mug Set", category: "Home", price: 32 },
  { id: 3, name: "Leather Journal", category: "Stationery", price: 28 },
  { id: 4, name: "Handwoven Basket", category: "Home", price: 55 },
  { id: 5, name: "Wood Carving Set", category: "Art", price: 65 },
];

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q')?.toLowerCase() || '';
  
  const [results, setResults] = useState(placeholderProducts);

  useEffect(() => {
    if (query) {
      const filtered = placeholderProducts.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
      );
      setResults(filtered);
    }
  }, [query]);

  return (
    <div className="section">
      <div className="container">
        <h1 className="sectionTitle">
          Search Results for "{query || 'all products'}"
        </h1>

        {results.length === 0 ? (
          <p>No products found for "{query}". Try different keywords.</p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '2rem', marginTop: '2rem' }}>
            {results.map(product => (
              <div key={product.id} style={{
                border: '1px solid #ddd',
                borderRadius: '12px',
                padding: '1.5rem',
                background: 'white'
              }}>
                <h3>{product.name}</h3>
                <p>Category: {product.category}</p>
                <p style={{ fontWeight: 'bold', color: 'var(--color-terracotta)' }}>
                  ${product.price}
                </p>
                <Link href={`/products/${product.id}`} style={{ color: 'var(--color-sage)' }}>
                  View Details →
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}