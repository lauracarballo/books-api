import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

export default function Books({ setLists, lists, remove }) {
  const [select, setSelect] = useState(null);

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

  function handleSelect(item) {
    setSelect(item);
  }
  return (
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
                <img className="book__content__img" src={select.image} alt="" />
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
  );
}
