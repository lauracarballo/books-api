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

        ol,
        ul {
          list-style: none;
        }

        html, body {
          position: relative;
          height: 110%;
          width: 100%;
        }

        body {
          background-image: url("/img/wallpaper.jpeg");
          background-size: cover;
          line-height: 1;
        }

        body:before {
          background-color: hsl(0deg 0% 0% / 22%);
          content: "";
          height: 100%;
          width: 100%;
          position: absolute;
          top: 0;
          left: 0;
          z-index: -1;
        }

        .page {
          padding: 0px 40px;
        }

        .header {
          display: flex;
          justify-content: space-between;
          padding: 20px 0px;
          z-index: 1;
          position: relative;
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
          z-index: 1;
          position relative;
        }

        .delete-button {
          display: flex;
          justify-content: flex-end;
        }

        .delete-button__inner-button {
          border-radius: 15px;
          
        }

        button {
          display: block;
          background-color: #a48972;
          border: 2px solid #523906;
          box-shadow: 8px 0px 8px #523906;
          border-radius: 5px;
          color: #fff;
          padding: 5px 8px;
          font-size: 12px;
        }

        button:focus {
          border: none;
          outline: none;
        }

        .books, .wishlist {
          display: flex;
          margin: 10px 0px;
          padding: 15px 15px;
          box-shadow: 8px 0px 8px #523906;
          width: 97%;
          min-height: 220px;
          max-height: 220px;
          white-space: nowrap;
          overflow: scroll;
          justify-content: flex-start;
          font-family: "Open Sans", cursive;
          background-image: url("/img/wood.jpeg");
          background-size: cover;
          position: relative;
        }

        .wishlist {
          background-image: none;
          box-shadow: none;
          justify-content: left;
        }


        .book-item, .wishlist-item {
          padding: 15px 15px;
          max-width: 150px;
          text-align: center;
        }

        .book__img {
          width: 120px;
          height: 180px;
        }

        .book__content {
          display: flex;
          padding: 10px 30px;
          justify-content: center;
          align-items: center;
          color: #000;
          width: 70%;
          background-color: #fff;
          position: relative;
          top: 120px;
          left: 160px;
          height: 400px;
          border-radius: 2px;
          z-index: 0;
        }

        .book__content__img {
          width: 180px;
          height: 280px;
        }

        .book__content__description {
          max-width: 70%; 
        }

        .book__content__description-item {
          padding: 10px 20px;
        }

        .book__content__description-item-title {
          font-size: 30px;
        }

        .book__content-background {
          position:fixed;
          padding:0;
          margin:0;
          top:0;
          left:0;
          width: 100%;
          height: 100%;
          background:rgba(255,255,255,0.5);
          z-index: 1;
        }

        h1 {
          font-family: "Amatic SC", cursive;
          font-size: 50px;
          color: #ffffff;
          letter-spacing: 0.05em;
        }

        h2 {
          font-family: "Amatic SC", cursive;
          font-size: 40px;
          color: #fff;
          letter-spacing: 0.05em;
          position: relative;
          z-index: 1;
          
        }
      `}</style>
    </div>
  );
}

export default Layout;
