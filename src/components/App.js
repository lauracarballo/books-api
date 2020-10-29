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
  const [lists, setLists] = useState({
    books: [],
    wishlist: [],
  });
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

  const fetchLists = async () => {
    const storedLists = await fetch("http://localhost:5000/lists").then((res) =>
      res.json()
    );
    console.log(storedLists);

    setLists(storedLists);
  };

  useEffect(() => {
    fetchLists();
  }, []);

  useEffect(() => {
    const saveLists = async () => {
      await fetch("http://localhost:5000/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lists }),
      });
    };
    saveLists();
  }, [lists]);

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

    if (result.source.droppableId === result.destination.droppableId) {
      // Same list
      const items = Array.from(lists[result.source.droppableId]);
      const [reorderedItem] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reorderedItem);
      setLists((prevLists) => ({
        ...prevLists,
        [result.source.droppableId]: items,
      }));
    } else {
      // Inter list
      const source = Array.from(lists[result.source.droppableId]);
      const destination = Array.from(lists[result.destination.droppableId]);

      const [removedItem] = source.splice(result.source.index, 1);
      destination.splice(result.destination.index, 0, removedItem);

      setLists((prevLists) => ({
        ...prevLists,
        [result.source.droppableId]: source,
        [result.destination.droppableId]: destination,
      }));
    }
  }

  // function handleDelete(id) {}

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
              {lists.books.map((item, index) => {
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
                              // onClick={() => handleDelete(item.id)}
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
                  <img
                    className="book__content__img"
                    src={select.image}
                    alt=""
                  />
                )}
                <div className="book__content__description">
                  <div className="book__content__description-item book__content__description-item-title">
                    {select.title}
                  </div>
                  <div className="book__content__description-item">
                    {select.authors.join(", ")}
                  </div>
                  <div className="book__content__description-item">
                    {select.description}
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>

        <div>
          <h2>To be read...</h2>

          <Droppable droppableId="wishlist" direction="horizontal">
            {(provided) => (
              <ul
                className="wishlist"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {lists.wishlist.map((item, index) => {
                  console.log(item);
                  return (
                    <Draggable
                      // isDragDisabled={!remove}
                      key={item.id}
                      draggableId={"wish" + item.id.toString()}
                      index={index}
                    >
                      {(provided) => (
                        <li
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="wishlist-item"
                        >
                          {remove ? (
                            <div className="delete-button">
                              <button
                                // onClick={() => handleDelete(item.id)}
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
        </div>
      </DragDropContext>
    </div>
  );
}

export default App;
