import React from "react";
import styled from "styled-components";

const Item = ({ name, cost, value, numOwned, handleClick }) => {
  return (
    <ItemWrapper>
      <div>
        <Name>{name}</Name>
        <p>
          Cost: {cost} cookie(s). Produces {value} cookies/second
        </p>
      </div>
      <Count>{numOwned}</Count>
    </ItemWrapper>
  );
};

const Name = styled.div`
  font-weight: bold;
  font-size: 20px;
`;
const ItemWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid white;
  padding: 10px;
  width: 100%;

  &:hover {
    border: 1px solid blue;
  }
`;

const Count = styled.div`
  font-size: 24px;
  margin-left: 20px;
`;

export default Item;
