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

        body {
          background-image: url("/img/wallpaper.jpeg");
          background-size: cover;
          line-height: 1;
        }

        body:before {
          background-color: hsl(0deg 0% 0% / 20%);
          content: "";
          height: 100%;
          width: 100%;
          position: absolute;
          top: 0;
          left: 0;
          z-index: 0;
        }

        .page {
          padding: 0px 40px;
        }

        .header {
          display: flex;
          justify-content: space-between;
          padding: 40px 0px;
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
          margin: 20px 0px;
          box-shadow: 8px 0px 8px #523906;
          max-width: 100%;
          flex-wrap: wrap;
          justify-content: center;
          font-family: "Open Sans", cursive;
          background-image: url("/img/wood.jpeg");
          background-size: cover;
          z-index: 1;
          position: relative;
        }


        .book-item {
          padding: 30px 30px;
          width: 150px;
          text-align: center;
        }

        .book__img {
          width: 120px;
          height: 180px;
        }

        .book__content {
          padding: 5px 0px;
          color: #000;
        }

        h1 {
          font-family: "Amatic SC", cursive;
          font-size: 50px;
          color: #ffffff;
          letter-spacing: 0.05em;
        }

        // h2 {
        //   font-family: "Amatic SC", cursive;
        //   font-size: 40px;
        //   color: #fff;
        //   letter-spacing: 0.05em;
        //   position: relative;
        //   z-index: 1;
          
        // }
      `}</style>
    </div>
  );
}

export default Layout;
