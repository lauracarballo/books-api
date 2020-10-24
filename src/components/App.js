import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
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
  const [remove, setRemove] = useState(false);
  const [select, setSelect] = useState(null);
  const [value, setValue] = useState("EDIT");

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

  const fetchBooks = async () => {
    const storedBooks = await fetch("http://localhost:5000").then((res) =>
      res.json()
    );
    setBooks(storedBooks);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  function handleEdit() {
    if (remove === false) {
      setRemove(true);
      setValue("DONE");
    } else {
      setRemove(false);
      setValue("EDIT");
    }
  }

  function handleSelect(item) {
    setSelect(item);
  }

  function handleOnDragEnd(result) {
    if (!result.destination) return;

    const items = Array.from(books);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setBooks(items);
  }

  async function handleDelete(id) {
    await fetch("http://localhost:5000/" + id, {
      method: "DELETE",
    });
    fetchBooks();
  }

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
                description: item.description,
              }),
            }).then((res) => res.json());

            // Response is a an object: { "created": true }
            if (response.created) {
              fetchBooks();
            }

            // if (action.action === "select-option") {
            //   setBooks((prevItem) => {
            //     return [...prevItem, item];
            //   });
            // }
          }}
        />
      </header>

      <div className="delete-button">
        <button onClick={handleEdit}>{value}</button>
      </div>

      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="books" direction="horizontal">
          {(provided) => (
            <ul
              className="books"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {books.map((item, index) => {
                return (
                  <Draggable
                    isDragDisabled={!remove}
                    key={item.id}
                    draggableId={item.id.toString()}
                    index={index}
                  >
                    {(provided) => (
                      <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="book-item"
                      >
                        {remove ? (
                          <div className="delete-button">
                            <button
                              onClick={() => handleDelete(item.id)}
                              className="delete-button__inner-button"
                            >
                              x
                            </button>
                          </div>
                        ) : null}
                        {item.image && (
                          <img
                            onClick={() => handleSelect(item)}
                            className="book__img"
                            src={item.image}
                            alt=""
                          />
                        )}
                      </li>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>

      <div>
        {select ? (
          <div
            className="book__content-background"
            onClick={() => {
              setSelect(false);
            }}
          >
            <div className="book__content">
              {select.image && (
                <img className="book__content__img" src={select.image} alt="" />
              )}
              <div className="book__content__description">
                <span className="book__content__description-item">
                  {select.title}
                </span>
                <span className="book__content__description-item">
                  {select.authors.join(", ")}
                </span>
                <span className="book__content__description-item">
                  {select.description}
                </span>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default App;
