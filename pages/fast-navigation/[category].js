import styled from "styled-components";
import Link from "next/link";
import useSWR from "swr";
import { useRouter } from "next/router";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 20px;
`;

const List = styled.ul`
  display: inline-flex;
  flex-wrap: wrap;
  gap: 10px;
  list-style-type: none;
`;

const Item = styled.li`
  padding: 5px;
  cursor: pointer;

  &:hover {
    font-weight: bolder;
  }
`;

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

export const Men = () => {
  const { data, error, isLoading, isValidating } = useSWR(
    "https://api.appworks-school.tw/api/1.0/products/men?paging=0",
    fetcher
  );
  // console.log(isLoading, isValidating);
  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <Items>
      <h3>Men</h3>
      {data.map((item) => {
        return <div key={item.id}>{item.title}</div>;
      })}
      {/* {isValidating && <div>Validating...</div>} */}
    </Items>
  );
};

export const Women = () => {
  const { data, error, isLoading, isValidating } = useSWR(
    "https://api.appworks-school.tw/api/1.0/products/women?paging=0",
    fetcher
  );
  // console.log(isLoading, isValidating);
  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <Items>
      <h3>Women</h3>
      {data.map((item) => {
        return <div key={item.id}>{item.title}</div>;
      })}
      {/* {isValidating && <div>Validating...</div>} */}
    </Items>
  );
};

const Category = () => {
  const router = useRouter();
  console.log(router.query);
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

      {router.query.category === "men" && <Men />}
      {router.query.category === "women" && <Women />}
    </Container>
  );
};

export default Category;
