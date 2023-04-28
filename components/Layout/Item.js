import styled from "styled-components";

const StyledItem = styled.li`
  padding: 5px;
  cursor: pointer;

  &:hover {
    font-weight: bolder;
  }
`;

const Item = ({ children }) => {
  return <StyledItem>{children}</StyledItem>;
};

export default Item;
