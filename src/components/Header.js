import React from "react";
import styled from "styled-components";
import { components } from "react-select";
import AsyncSelect from "react-select/async";
import { useAuth } from "../context/auth";
import axios from "redaxios";
import { Button } from "./Button";

const key = process.env.REACT_APP_KEY;

export default function Header({ username, setLists, handleEdit, value }) {
  const { logout } = useAuth();

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

  return (
    <HeaderWrapper>
      <ContainerWrapper>
        <h1>{username}'s BOOKSHELF</h1>
        <Button onClick={logout}>Sign Out</Button>
      </ContainerWrapper>
      <ContainerWrapper>
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
          }}
        />
        <ButtonWrapper>
          <Button onClick={handleEdit}>{value}</Button>
        </ButtonWrapper>
      </ContainerWrapper>
    </HeaderWrapper>
  );
}

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
    marginTop: 20,
    marginBottom: 10,
  }),
  control: (provided) => ({
    ...provided,
    borderColor: "#fff",
  }),
};

export const HeaderWrapper = styled.header`
  z-index: 1;
  position: relative;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const ContainerWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
