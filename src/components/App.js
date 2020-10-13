import React from "react";

function App() {
  return (
    <div className="App">
      <header className="header">
        <h1>MY PERSONAL BOOKSHELF</h1>
        <div className="search-bar">
          <input type="text" />
          <button>
            <i className="fas fa-search"></i>
          </button>
        </div>
      </header>

      <ul className="books">
        <li className="book-item">
          <div className="book__content">
            <div className="book__content">Book Title</div>
            <div className="book__content">Authors</div>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default App;
