import Container from "@/components/Layout/Container";
import styled from "styled-components";
import { useState } from "react";
import useSWR from "swr";

const Button = styled.button`
  padding: 10px;
  background-color: #ccc;
  color: #333;
  margin: 20px;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    filter: brightness(0.8);
  }
`;

const fetcher = (url) => fetch(url).then((res) => res.json());

const Conditional = () => {
  const [toggleFetch, setToggleFetch] = useState(false);

  const { data, error, isLoading } = useSWR(
    toggleFetch
      ? `https://api.stackexchange.com/2.3/tags?page=1&pagesize=10&order=desc&sort=popular&site=stackoverflow`
      : null,
    fetcher
  );

  if (error) return <div>failed to load</div>;

  return (
    <Container>
      <h2>Conditional Fetching</h2>
      <Button
        onClick={() => {
          setToggleFetch((prev) => !prev);
        }}
      >
        Fetching
      </Button>
      {isLoading && <div>Loading...</div>}
      {data &&
        data?.items.map((item) => <div key={item.name}>{item.name}</div>)}
    </Container>
  );
};

export default Conditional;
