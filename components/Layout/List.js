import styled from "styled-components";

const StyledList = styled.ul`
  display: inline-flex;
  flex-wrap: wrap;
  gap: 10px;
  list-style-type: none;
`;

const List = ({ children }) => {
  return <StyledList>{children}</StyledList>;
};

export default List;
