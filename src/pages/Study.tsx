import { useEffect, useState } from "react";

// 1.
// Build a SearchableList component. Fetch users from /api/users, debounce the search input by 400ms, and
// paginate results 5 per page. Reset to page 1 when query changes.

// 2.
// Implement a higher-order function that caches the results of another function. Same input → return cached
// result without re-running.

// 3.
// Convert a flat array of items with parentId into a nested tree. Each node gets a children array. O(n) solution
// using a map lookup.

export default function Study() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");

  const url = "http://localhost:3001/api/products";
  function productList() {
    fetch(url)
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((e) => setError(e.toString()))
      .finally();
  }

  useEffect(() => {
    productList();
  }, []);
  return (
    <>
      <select>category</select>
      {products.map((p) => (
        <div key={p.id}>
          <p>{p.name}</p>
          <p>{p.category}</p>
        </div>
      ))}

      <ul>product.name, product.category, product.available</ul>
    </>
  );
}
