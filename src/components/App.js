import React, { useState, useEffect } from "react";
import { components } from "react-select";
import AsyncSelect from "react-select/async";
import axios from "redaxios";

const key = process.env.REACT_APP_KEY;

const Option = (props) => {
  return (
    <components.Option {...props}>
      {props.label} - {props.data.authors}
    </components.Option>
  );
};

const customStyles = {
  container: (provided) => ({
    ...provided,
    width: 300,
  }),
  control: (provided) => ({
    ...provided,
    borderColor: "#fff",
  }),
};

function App() {
  const [books, setBooks] = useState([]);

  const fetchBookTitles = async (search) => {
    const result = await axios(
      `https://www.googleapis.com/books/v1/volumes?q=${search}&key=${key}`
    );
    return result.data.items.map((item) => {
      return {
        label: item.volumeInfo.title,
        value: item.id,
        image:
          item.volumeInfo.imageLinks &&
          item.volumeInfo.imageLinks.smallThumbnail,
        authors: item.volumeInfo.authors,
      };
    });
  };

  const fetchBooks = async () => {
    const storedBooks = await fetch("http://localhost:5000").then((res) =>
      res.json()
    );
    setBooks(storedBooks);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div className="page">
      <header className="header">
        <h1>MY PERSONAL BOOKSHELF</h1>

        <AsyncSelect
          cacheOptions
          defaultOptions
          components={{ Option }}
          loadOptions={fetchBookTitles}
          styles={customStyles}
          onChange={async (item, action) => {
            console.log(item);
            const response = await fetch("http://localhost:5000", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                title: item.label,
                authors: item.authors,
                image: item.image,
              }),
            }).then((res) => res.json());

            // Response is a an object: { "created": true }
            if (response.created) {
              setBooks((prevValue) => {
                return [...prevValue, item];
              });
            }

            // if (action.action === "select-option") {
            //   setBooks((prevItem) => {
            //     return [...prevItem, item];
            //   });
            // }
          }}
        />
      </header>

      <ul className="books">
        {books.map((item) => {
          console.log(item);
          return (
            <li className="book-item" key={item.value}>
              {item.image && (
                <img className="book__img" src={item.image} alt="" />
              )}
              {/* <div className="book__content">
                <div className="book__content">{item.title}</div>
                <div className="book__content">{item.authors.join(", ")}</div>
              </div> */}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
