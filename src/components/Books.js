import React, { useState } from "react";
import styled from "styled-components";
import { DeleteButton } from "./Button";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import SelectedBooks from "./SelectedBook";

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
          <List
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
                    <ListItem
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      {remove ? (
                        <ButtonWrapper>
                          <DeleteButton
                            onClick={() => handleDelete("books", index)}
                          >
                            x
                          </DeleteButton>
                        </ButtonWrapper>
                      ) : null}
                      {item.image && (
                        <Image
                          onClick={() => handleSelect(item)}
                          src={item.image}
                          alt=""
                        />
                      )}
                    </ListItem>
                  )}
                </Draggable>
              );
            })}
            {provided.placeholder}
          </List>
        )}
      </Droppable>

      <div>
        <h2>To be read...</h2>
        <Droppable droppableId="wishlist" direction="horizontal">
          {(provided) => (
            <List
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
                      <ListItem
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        {remove ? (
                          <ButtonWrapper>
                            <DeleteButton
                              onClick={() => handleDelete("wishlist", index)}
                            >
                              x
                            </DeleteButton>
                          </ButtonWrapper>
                        ) : null}
                        {item.image && (
                          <Image
                            onClick={() => handleSelect(item)}
                            src={item.image}
                            alt=""
                          />
                        )}
                      </ListItem>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </List>
          )}
        </Droppable>
      </div>
      <SelectedBooks select={select} setSelect={setSelect} />
    </DragDropContext>
  );
}

export const List = styled.ul`
  display: flex;
  margin: 10px 0px;
  padding: 12px 15px;
  box-shadow: 8px 0px 8px #523906;
  width: 100%;
  min-height: 220px;
  max-height: 220px;
  white-space: nowrap;
  overflow: scroll;
  justify-content: flex-start;
  font-family: "Open Sans", cursive;
  background-image: url("/img/wood.jpeg");
  background-size: cover;
  position: relative;
`;

export const ListItem = styled.li`
  padding: 12px 15px;
  max-width: 150px;
  text-align: center;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const Image = styled.img`
  width: 110px;
  height: 160px;
`;
