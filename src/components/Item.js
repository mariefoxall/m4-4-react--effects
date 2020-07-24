import React from "react";
import styled from "styled-components";

const Item = ({
  name,
  cost,
  increasePerSecond,
  increasePerClick,
  numOwned,
  handleClick,
  isFirst,
}) => {
  const itemRef = React.useRef(null);
  React.useEffect(() => {
    isFirst && itemRef.current.focus();
  }, [isFirst]);
  return (
    <ItemWrapper ref={itemRef} onClick={() => handleClick({ cost, name })}>
      <div>
        <Name>{name}</Name>
        <p>
          {increasePerSecond > 0 &&
            `Cost: ${cost} cookie(s). Produces ${increasePerSecond} cookies/second`}
        </p>
        <p>
          {increasePerClick > 0 &&
            `Cost: ${cost} cookie(s). Produces ${increasePerClick} cookies/click`}
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
