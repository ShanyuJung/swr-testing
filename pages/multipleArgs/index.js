import Container from "@/components/Layout/Container";
import styled from "styled-components";
import useSWR from "swr";
import { useMemo, useState } from "react";
import { Button } from "../conditional";

const Items = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
  gap: 5px;
`;

const fetcher = ([url, params]) =>
  fetch(`${url}/${params.category}?paging=${params.paging}`)
    .then((res) => res.json())
    .then((res) => res.data);

const MultipleArgs = () => {
  const [category, setCategory] = useState("men");
  const params = useMemo(() => ({ category: category, paging: 0 }), [category]);

  const { data, error, isLoading } = useSWR(
    ["https://api.appworks-school.tw/api/1.0/products", params],
    fetcher
  );

  if (error) return <div>failed to load</div>;

  return (
    <Container>
      <h2>Multiple Arguments</h2>
      <div>
        <Button
          onClick={() => {
            setCategory("men");
          }}
        >
          Men
        </Button>
        <Button
          onClick={() => {
            setCategory("women");
          }}
        >
          Women
        </Button>
      </div>
      {isLoading && <div>Loading...</div>}

      <Items>
        <h3>{category}</h3>
        {data &&
          data?.map((item) => {
            return <div key={item.id}>{item.title}</div>;
          })}
      </Items>
    </Container>
  );
};

export default MultipleArgs;
