import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { components } from "react-select";
import AsyncSelect from "react-select/async";
import axios from "redaxios";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { AuthContext, useAuth } from "../context/auth";

import Signup from "../pages/Signup";
import PrivateRoute from "../PrivateRoute";

const key = process.env.REACT_APP_KEY;

const IS_LOCAL = false;
const API_URL = IS_LOCAL
  ? "http://localhost:5000"
  : "https://mawxfs6gx5.execute-api.us-east-1.amazonaws.com";

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

function BookLists() {
  const { authToken, logout } = useAuth();
  const [isLoading, setLoading] = useState(true);
  const [lists, setLists] = useState({
    wishlist: [],
    books: [],
  });
  const [remove, setRemove] = useState(false);
  const [select, setSelect] = useState(null);
  const [value, setValue] = useState("EDIT");
  const [name, setName] = useState("");

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
    const storedLists = await fetch(`${API_URL}/dev/lists`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }).then((res) => res.json());

    if (storedLists.success) {
      setLists(storedLists.lists);
      setLoading(false);
    } else {
      logout();
    }
  };

  const fetchProfile = async () => {
    const storedProfile = await fetch(`${API_URL}/dev/profile`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }).then((res) => res.json());

    if (storedProfile.success) {
      setName(storedProfile.name);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLists();
    fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const saveLists = async () => {
      await fetch(`${API_URL}/dev/save`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ lists }),
      });
    };
    if (!isLoading) {
      saveLists();
    }
  }, [isLoading, lists, authToken]);

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

  function handleDelete(listName, index) {
    const clone = Array.from(lists[listName]);
    clone.splice(index, 1);
    setLists((prevLists) => ({
      ...prevLists,
      [listName]: clone,
    }));
  }

  function handleLogout() {
    logout();
  }

  return (
    <div className="page">
      {isLoading === false ? (
        <div>
          <header className="header">
            <h1>{name}'s BOOKSHELF</h1>
            <div className="logout-button">
              <button onClick={handleLogout}>Sign Out</button>
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
      ) : null}

      {isLoading && <h2 className="loading">Loading...</h2>}

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
                              onClick={() => handleDelete("books", index)}
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
                      isDragDisabled={!remove}
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
                                onClick={() => handleDelete("wishlist", index)}
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

export default function App() {
  const existingTokens = localStorage.getItem("token");

  const [isAuthenticated, setIsAuthenticated] = useState(
    existingTokens ? true : false
  );
  const [authToken, setAuthTokens] = useState(existingTokens);

  async function login(email, password) {
    const response = await fetch(`${API_URL}/dev/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    }).then((res) => res.json());

    if (response.success === true) {
      localStorage.setItem("token", response.token);
      setAuthTokens(response.token);
      setIsAuthenticated(true);
    }
  }

  async function signUp(name, email, password) {
    const response = await fetch(`${API_URL}/dev/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    }).then((res) => res.json());

    if (response.success === true) {
      localStorage.setItem("token", response.token);
      setAuthTokens(response.token);
      setIsAuthenticated(true);
    }
  }

  function logout() {
    setIsAuthenticated(false);
    localStorage.removeItem("token");
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        authToken,
        login,
        logout,
        signUp,
      }}
    >
      <Router>
        <Route path="/signup" component={Signup} />
        <PrivateRoute path="/" exact component={BookLists} />
      </Router>
    </AuthContext.Provider>
  );
}
