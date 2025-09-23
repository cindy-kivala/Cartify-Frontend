import { Link } from "react-router-dom";


function HomePage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((r) => r.json())
      .then(setProducts);
  }, []);

  const addToCart = (product) => {
    fetch("http://localhost:5000/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...product, quantity: 1 }),
    });
  };
 
  return (
    <div className="products-page p-6">
      <h1 className="">Home - Products</h1>
      <div className="grid grid-cols-3 gap-4">
        {products.map((p) => (
          <div key={p.id} className="border p-4">
            <h2 className="font-bold">{p.name}</h2>
            <p>${p.price}</p>
            <button
              onClick={() => addToCart(p)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;