import React from "react";
import { components } from "react-select";
import AsyncSelect from "react-select/async";
import { useAuth } from "../context/auth";
import axios from "redaxios";

const key = process.env.REACT_APP_KEY;

export default function Header({ username, setLists, handleEdit, value }) {
  const { logout } = useAuth();

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
        description: item.volumeInfo.description,
      };
    });
  };

  return (
    <div>
      <header className="header">
        <h1>{username}'s BOOKSHELF</h1>
        <div className="logout-button">
          <button onClick={logout}>Sign Out</button>
        </div>
      </header>
      <AsyncSelect
        cacheOptions
        defaultOptions
        placeholder="Add a book here"
        components={{ Option }}
        loadOptions={fetchBookTitles}
        styles={customStyles}
        onChange={(item, action) => {
          setLists((prevLists) => ({
            ...prevLists,
            wishlist: [
              ...prevLists.wishlist,
              {
                id: item.value,
                title: item.label,
                authors: item.authors,
                image: item.image,
                description: item.description,
              },
            ],
          }));

          // if (action.action === "select-option") {
          //   setBooks((prevItem) => {
          //     return [...prevItem, item];
          //   });
          // }
        }}
      />
      <div className="delete-button">
        <button onClick={handleEdit}>{value}</button>
      </div>
    </div>
  );
}

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
