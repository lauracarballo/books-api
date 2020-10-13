import React, { useState, useEffect } from "react";
import axios from "redaxios";

const key = process.env.REACT_APP_KEY;

function App() {
  const [data, setData] = useState({ items: [] });
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        `https://www.googleapis.com/books/v1/volumes?q=${search}&key=${key}`
      );
      setData(result.data);
    };
    fetchData();
  }, [search]);

  return (
    <div className="App">
      <header className="header">
        <h1>MY PERSONAL BOOKSHELF</h1>
        <div className="search-bar">
          <input
            onChange={(event) => {
              setQuery(event.target.value);
            }}
            type="text"
            value={query}
          />
          <button
            onClick={() => {
              setSearch(query);
            }}
          >
            <i className="fas fa-search"></i>
          </button>
        </div>
      </header>

      <ul className="books">
        {data.items.map((item) => {
          console.log(item);
          return (
            <li className="book-item" key={item.id}>
              {item.volumeInfo.imageLinks && (
                <img
                  className="book__img"
                  src={item.volumeInfo.imageLinks.smallThumbnail}
                  alt=""
                />
              )}
              <div className="book__content">
                <div className="book__content">{item.volumeInfo.title}</div>
                <div className="book__content">{item.volumeInfo.authors}</div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
