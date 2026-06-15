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

function useDebounce(value, delay) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}

export default function Study() {
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [userPage, setUserPage] = useState(1);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 400);
  // DEBOUNCING
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  const url = "http://localhost:3001";
  function productList() {
    fetch(url + "/api/products")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((e) => setError(e.toString()))
      .finally();
  }

  function userList() {
    let query = "";
    if (debouncedQuery != "") {
      query += `q=${debouncedQuery}`;
    }
    fetch(url + `/api/users?${query}&page=${userPage}&limit=5`)
      .then((response) => response.json())
      .then((data) => {
        // API probably returns { users: [...], total, page } — grab the array
        console.log(data.items);
        setUsers(data.items);
      })
      .catch((e) => setError(e.toString()))
      .finally();
  }

  function changePage(value: number) {
    if (value > 0) {
      setUserPage((prev) => prev + 1);
    }
    if (value < 0) {
      setUserPage((prev) => prev - 1);
    }
    if (userPage < 0) {
      setUserPage(1);
    }
  }

  useEffect(() => {
    if (debouncedQuery) {
      userList();
    }
  }, [debouncedQuery]);

  useEffect(() => {
    userList();
  }, []);

  useEffect(() => {
    userList();
  }, [userPage]);

  return (
    <>
      <label>
        Search:
        <input
          name="myInput"
          placeholder="Search..."
          value={debouncedQuery}
          onChange={(e) => useDebounce(e.target.value, 400)}
        />
      </label>

      <ul>
        {users.map((u) => (
          <div key={u.id}>
            <li>
              {u.name}, {u.email}
            </li>
          </div>
        ))}
      </ul>
      <button onClick={() => changePage(1)}>Next</button>
      <button onClick={() => changePage(-1)}>Back</button>
    </>
  );
}
