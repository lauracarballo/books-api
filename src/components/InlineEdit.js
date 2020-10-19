import React, { useState } from "react";

const InlineEdit = ({ defaultValue, onConfirm, placeholder }) => {
  const [isEditing, setEditing] = useState(false);
  const [internalValue, setInternalValue] = useState(defaultValue);

  function handleChange(event) {
    const value = event.target.value;
    setInternalValue(value);
  }

  function handleClick(event) {
    onConfirm(internalValue);
    event.preventDefault();
    setEditing(false);
  }

  function handleCancel() {
    setInternalValue(defaultValue);
    setEditing(false);
  }

  function handleKeypress(event) {
    if (event.key === "Enter") {
      onConfirm(internalValue);
      event.preventDefault();
      setEditing(false);
    }
  }

  return (
    <>
      <div className="user__edit-container">
        {isEditing ? (
          <>
            <input
              autoFocus
              className="user__edit-input"
              type="text"
              onChange={handleChange}
              onKeyPress={handleKeypress}
              value={internalValue}
              placeholder={placeholder}
            />
            <button
              className="user__edit-button user__edit-button-save"
              onClick={handleClick}
            >
              <i className="fas fa-check"></i>
            </button>
            <button
              className="user__edit-button user__edit-button-cancel"
              onClick={handleCancel}
            >
              <i className="fas fa-times"></i>
            </button>
          </>
        ) : (
          <div
            className="user__edit-textfield"
            onClick={() => setEditing(true)}
          >
            {internalValue}
          </div>
        )}
        <style jsx>{`
          .user__edit-container {
            position: relative;
            display: inline-block;
            width: 100%;
          }
          .user__edit-input {
            width: 100%;
            border-color: rgb(223, 225, 230);
            border-radius: 3px;
            border-style: solid;
            font-weight: inherit;
            font-size: inherit;
            padding: 5px 10px;
            line-height: inherit;
            box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px -2px,
              rgba(9, 30, 66, 0.31) 0px 0px 1px;
          }

          .user__edit-button {
            position: absolute;
            border: none;
            box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px -2px,
              rgba(9, 30, 66, 0.31) 0px 0px 1px;
          }

          .user__edit-button-save {
            bottom: -25px;
            right: 30px;
            height: 20px;
          }
          .user__edit-button-cancel {
            bottom: -25px;
            right: 0;
            height: 20px;
            width: 25px;
          }
        `}</style>
      </div>
    </>
  );
};

export default InlineEdit;
