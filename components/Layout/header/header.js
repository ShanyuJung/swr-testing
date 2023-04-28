import Link from "next/link";
import styled from "styled-components";

const Wrapper = styled.header`
  width: 100%;
  padding: 20px;
  border-bottom: 1px solid #ccc;
`;

const List = styled.ul`
  width: 100%;
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

const Header = () => {
  return (
    <Wrapper>
      <List>
        <Item>
          <Link href="/">Home</Link>
        </Item>
        <Item>
          <Link href="/fast-navigation">Fast Navigation</Link>
        </Item>
        <Item>
          <Link href="/dependent">Dependent Request</Link>
        </Item>
      </List>
    </Wrapper>
  );
};

export default Header;
