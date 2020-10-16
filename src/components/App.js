import React, { useState } from "react";
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

  return (
    <div className="App">
      <header className="header">
        <h1>MY PERSONAL BOOKSHELF</h1>

        <AsyncSelect
          cacheOptions
          defaultOptions
          components={{ Option }}
          loadOptions={fetchBookTitles}
          styles={customStyles}
          onChange={(value, action) => {
            console.log(action);
            if (action.action === "select-option") {
              setBooks((prevValue) => {
                return [...prevValue, value];
              });
            }
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
              <div className="book__content">
                <div className="book__content">{item.label}</div>
                <div className="book__content">{item.authors.join(", ")}</div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
