import React from "react";
import styled from "styled-components";

const Item = ({ name, cost, value, numOwned, handleClick, isFirst }) => {
  const itemRef = React.useRef(null);
  React.useEffect(() => {
    isFirst && itemRef.current.focus();
  }, []);
  return (
    <ItemWrapper ref={itemRef} onClick={() => handleClick({ cost, name })}>
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
const ItemWrapper = styled.button`
  display: flex;
  background-color: #222;
  outline: none;
  justify-content: space-between;
  border: none;
  border-bottom: 1px solid white;
  padding: 10px;
  width: 100%;
  color: white;

  &:hover {
    border: 1px solid blue;
  }

  &:focus {
    border: 1px solid white;
    /* background-color: grey; */
  }
`;

const Count = styled.div`
  font-size: 24px;
  margin-left: 20px;
`;

export default Item;
