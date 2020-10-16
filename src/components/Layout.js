import React from "react";

function Layout(props) {
  return (
    <div className="page-layout">
      {props.children}
      <style>{`
        html,
        body,
        div,
        span,
        h1,
        h2,
        h3,
        h4,
        h5,
        h6,
        p,
        a,
        em,
        img,
        strong,
        b,
        u,
        i,
        center,
        ol,
        ul,
        li,
        fieldset,
        form,
        label,
        footer,
        header,
        menu,
        nav,
        section {
          margin: 0;
          padding: 0;
          border: 0;
          font-size: 100%;
          font: inherit;
          vertical-align: baseline;
        }

        body {
          line-height: 1;
        }
        ol,
        ul {
          list-style: none;
        }

        .header {
          display: flex;
          justify-content: space-between;
          padding: 40px 40px;
          background-color: #ffefd8;
        }

        .search-bar {
          display: flex;
          justify-content: space-between;
          width: 20%;
          height: 30px;
          background-color: #ffffff;
          border: none;
          border-radius: 5px;
          padding: 5px 10px;
        }

        button {
          background-color: inherit;
          border: none;
          justify-content: flex-end;
        }

        button:focus {
          border: none;
          outline: none;
        }

        .books {
          display: flex;
          padding: 40px 40px;
          max-width: 100%;
          flex-wrap: wrap;
          justify-content: center;
          font-family: "Open Sans", cursive;
        }

        .book-item {
          padding: 30px 30px;
          width: 150px;
          text-align: center;
        }

        .book__img {
          width: 130px;
          height: 200px;
        }

        .book__content {
          padding: 5px 0px;
        }

        h1 {
          font-family: "Amatic SC", cursive;
          font-size: 40px;
          color: #a35638;
          letter-spacing: 0.05em;
        }
      `}</style>
    </div>
  );
}

export default Layout;
