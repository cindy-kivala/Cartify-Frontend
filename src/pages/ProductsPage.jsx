import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProducts } from "../services/api";
import AddToCartButton from "../components/AddToCartButton";

export default function ProductsPage({ user }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-[#0a0a0f] to-[#1a1a2e]">
      <div className="max-w-7xl mx-auto">
        <h1 className="page-title text-center mb-8">All Products</h1>

        {products.length === 0 ? (
          <p className="text-center text-[#8888aa] text-lg">
            No products found
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div key={product.id} className="product-card flex flex-col">
                {/* Image */}
                <Link to={`/products/${product.id}`} className="relative block">
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-lg mb-3 transition-transform duration-300 hover:scale-105"
                    onError={(e) =>
                      (e.target.src =
                        "https://via.placeholder.com/300x200/e5e7eb/6b7280?text=No+Image")
                    }
                  />
                  {product.stock <= 5 && product.stock > 0 && (
                    <span className="absolute top-2 right-2 bg-orange-500 text-white px-2 py-1 rounded-full text-xs">
                      Only {product.stock} left!
                    </span>
                  )}
                  {product.stock === 0 && (
                    <span className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs">
                      Out of Stock
                    </span>
                  )}
                </Link>

                {/* Info */}
                <div className="flex-grow space-y-2">
                  <Link
                    to={`/products/${product.id}`}
                    className="hover:text-[#00f0ff] transition"
                  >
                    <h2 className="product-name line-clamp-2">
                      {product.name}
                    </h2>
                  </Link>

                  <p className="product-price">{product.price.toFixed(2)}</p>

                  <div className="flex flex-wrap gap-1">
                    {product.category && (
                      <span className="bg-[#00f0ff] text-black text-xs px-2 py-1 rounded-full font-bold">
                        {product.category}
                      </span>
                    )}
                    {product.brand && (
                      <span className="bg-[#ff00f7] text-white text-xs px-2 py-1 rounded-full font-bold">
                        {product.brand}
                      </span>
                    )}
                  </div>

                  {product.description && (
                    <p className="text-[#8888aa] text-sm line-clamp-2">
                      {product.description}
                    </p>
                  )}

                  <p
                    className={`text-sm font-medium ${
                      product.stock > 5
                        ? "text-[#00ff9d]"
                        : product.stock > 0
                        ? "text-orange-400"
                        : "text-red-400"
                    }`}
                  >
                    {product.stock > 0
                      ? `${product.stock} in stock`
                      : "Out of stock"}
                  </p>
                </div>

                {/* Add to cart */}
                <AddToCartButton
                  user={user}
                  productId={product.id}
                  stock={product.stock}
                  onAdded={() => console.log("Added", product.id)}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
