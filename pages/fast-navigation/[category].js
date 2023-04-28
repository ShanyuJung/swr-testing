import styled from "styled-components";
import Link from "next/link";
import useSWR from "swr";
import { useRouter } from "next/router";
import Container from "@/components/Layout/Container";
import List from "@/components/Layout/List";
import Item from "@/components/Layout/Item";

const Items = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
  gap: 5px;
`;

const fetcher = (url) =>
  fetch(url)
    .then((res) => res.json())
    .then((res) => res.data);

// const fetcher = (url) =>
//   fetch(url)
//     .then((res) => res.json())
//     .then((res) => {
//       const data = res.data;
//       try {
//         const randomNum = Math.floor(Math.random() * 100);
//         let response = data.map((item) => {
//           return { id: item.id, title: item.title };
//         });
//         response.push({ id: "random", title: randomNum });
//         return response;
//       } catch {}
//     });

const Tag = ({ tag, title }) => {
  const { data, error, isLoading, isValidating } = useSWR(
    `https://api.appworks-school.tw/api/1.0/products/${tag}?paging=0`,
    fetcher
  );
  // console.log(isLoading, isValidating);
  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <Items>
      <h3>{title}</h3>
      {data.map((item) => {
        return <div key={item.id}>{item.title}</div>;
      })}
      {/* {isValidating && <div>Validating...</div>} */}
    </Items>
  );
};

const Category = () => {
  const router = useRouter();

  return (
    <Container>
      <h2>Fast Navigation</h2>
      <List>
        <Item>
          <Link href="/fast-navigation/men">Men</Link>
        </Item>
        <Item>
          <Link href="/fast-navigation/women">Women</Link>
        </Item>
      </List>
      {!router.query.category && (
        <h3>Cache feature, Loading and Revalidation</h3>
      )}
      {router.query.category === "men" && <Tag title="Men" tag="men" />}
      {router.query.category === "women" && <Tag title="Women" tag="women" />}
    </Container>
  );
};

export default Category;
