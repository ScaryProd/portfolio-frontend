import { useEffect } from "react";

export default function Study() {
    // The prompt: You are given a mock REST endpoint that returns a list of PepsiCo products:

    // GET https://run.mocky.io/v3/...
    // Response: [{ "id": 1, "name": "Gatorade", "category": "Drinks", "available": true }, ...]

    // Build a React component ProductList that:

    // 1. Fetches the product list on mount
    // 2. Shows a loading indicator while fetching
    // 3. Displays products in a grid with name, category, and an "In Stock" / "Out of Stock" badge
    // 4. Handles and displays errors gracefully
    // 5. Allows filtering by category using a dropdown 

    let status: Status; //loading, loaded, error

    enum Status{
        Loading,
        Loaded,
        Error
    }


    let productList: [{}] // containing a int id, string name, string category, bool available

    let categories: [] // containing the list of categories displayed in the current product list


    useEffect(() => {
        load()
    },[]);
    function load(){
        status = Status.Loading;
        // call the function
        // productList = result
        // categories = result.uniqueCategories
    }

    function listOfProducts(filter: string): products[]{
        //filteredProducts = productList.filter( product.category == filter)

        // return filteredProducts
    }

    return (
        <>
            <a>loading/error</a>

            <select>category</select>
            <li>products</li>

            <ul>product.name, product.category, product.available</ul>
        </>
  );
}
