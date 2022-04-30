import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import Books from "../components/Books";
import { useAuth } from "../context/auth";

const IS_LOCAL = false;
const API_URL = IS_LOCAL
  ? "http://localhost:5000"
  : "https://mawxfs6gx5.execute-api.us-east-1.amazonaws.com";

export default function BookLists() {
  const { authToken, isAuthenticated, username } = useAuth();

  const [lists, setLists] = useState({
    wishlist: [],
    books: [],
  });
  const [value, setValue] = useState("EDIT");
  const [remove, setRemove] = useState(false);
  const [isLoading, setLoading] = useState(true);

  const fetchLists = async () => {
    const storedLists = await fetch(`${API_URL}/dev/lists`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }).then((res) => res.json());

    console.log(storedLists);

    if (storedLists.success) {
      setLists(storedLists.lists);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLists();
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
    if (isAuthenticated && !isLoading) {
      saveLists();
    }
  }, [isAuthenticated, lists, authToken, isLoading]);

  function handleEdit() {
    if (remove === false) {
      setRemove(true);
      setValue("DONE");
    } else {
      setRemove(false);
      setValue("EDIT");
    }
  }

  return (
    <PageWrapper>
      <Header
        username={username}
        setLists={setLists}
        handleEdit={handleEdit}
        value={value}
      />
      <Books setLists={setLists} lists={lists} remove={remove} />
    </PageWrapper>
  );
}

export const PageWrapper = styled.section`
  width: 90%;
  margin: 10px auto;
`;
