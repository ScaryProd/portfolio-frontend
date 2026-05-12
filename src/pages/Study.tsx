import { useEffect, useState } from "react";

export default function Study() {

    const [products, setProducts] = useState([])
    const [error, setError] = useState('')

    const url = 'http://localhost:3001/api/products'
    function productList() {
        fetch(url)
            .then(response => response.json())
            .then(data => setProducts(data))
            .catch(e => setError(e.toString()))
            .finally()
    }

    useEffect(() => {productList()}, [])
    return (
        <>

            <select>category</select>
            {products.map(p => 
                (
                    <div key={p.id}>
                        <p>{p.name}</p>
                        <p>{p.category}</p>
                    </div>
                )
            )}

            <ul>product.name, product.category, product.available</ul>
        </>
  );
}
