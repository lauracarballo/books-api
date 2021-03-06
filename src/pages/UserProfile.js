import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Books from "../components/Books";

const IS_LOCAL = process.env.NODE_ENV !== "production";
const API_URL = IS_LOCAL
  ? "http://localhost:5000"
  : "https://mawxfs6gx5.execute-api.us-east-1.amazonaws.com";

export default function SharedProfile() {
  const { shareId } = useParams();

  const [lists, setLists] = useState({
    wishlist: [],
    books: [],
  });

  const fetchLists = async () => {
    const storedLists = await fetch(
      `${API_URL}/dev/sharedLists?shareId=${shareId}`
    ).then((res) => res.json());

    console.log(storedLists);

    if (storedLists.success) {
      setLists(storedLists.lists);
    }
  };

  useEffect(() => {
    fetchLists();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PageWrapper>
      <h1>WELCOME TO MY BOOKSHELF</h1>

      <Books setLists={setLists} lists={lists} />
    </PageWrapper>
  );
}

export const PageWrapper = styled.section`
  width: 90%;
  margin: 50px auto;
`;
