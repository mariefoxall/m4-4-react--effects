import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import Item from "./Item";
import useInterval from "../hooks/use-interval.hook";

import cookieSrc from "../cookie.svg";

const items = [
  { id: "cursor", name: "Cursor", cost: 10, value: 1 },
  { id: "grandma", name: "Grandma", cost: 100, value: 10 },
  { id: "farm", name: "Farm", cost: 1000, value: 80 },
];

const Game = () => {
  const [numCookies, setNumCookies] = React.useState(100);
  const [purchasedItems, setPurchasedItems] = React.useState({
    cursor: 0,
    grandma: 0,
    farm: 0,
  });

  React.useEffect(() => {
    document.title = `${numCookies} cookies - Cookie Clicker Game`;
    // console.log("update cookies");

    return () => {
      document.title = "Cookie Clicker Game";
      // console.log("reset");
    };
  }, [numCookies]);

  React.useEffect(() => {
    console.log("onstart");
    const handleSpaceBar = (ev) => {
      if (ev.code === "Space") {
        // console.log("spacebar clicked");
        setNumCookies(numCookies + 1);
      }
    };
    window.addEventListener("keydown", handleSpaceBar);
    return () => {
      // console.log("removed");
      window.removeEventListener("keydown", handleSpaceBar);
    };
  });

  useInterval(() => {
    const calculateCookiesPerTick = ({ cursor, grandma, farm }) => {
      // console.log("cursor: ", cursor, "grandma: ", grandma, "farm: ", farm);
      return cursor + grandma * 10 + farm * 80;
    };
    const numOfGeneratedCookies = calculateCookiesPerTick(purchasedItems);
    // console.log(
    //   "numCookies: ",
    //   numCookies,
    //   "numOfGeneratedCookies: ",
    //   numOfGeneratedCookies
    // );
    setNumCookies(numCookies + numOfGeneratedCookies);
  }, 1000);

  return (
    <Wrapper>
      <GameArea>
        <Indicator>
          <Total>{numCookies} cookies</Total>
          <strong>
            {purchasedItems.cursor +
              purchasedItems.grandma * 10 +
              purchasedItems.farm * 80}
          </strong>{" "}
          cookies per second
        </Indicator>
        <Button onClick={() => setNumCookies(numCookies + 1)}>
          <Cookie src={cookieSrc} />
        </Button>
      </GameArea>

      <ItemArea>
        <SectionTitle>Items:</SectionTitle>
        {items.map((item, index) => {
          return (
            <Item
              key={item.id}
              name={item.name}
              cost={item.cost}
              value={item.value}
              numOwned={purchasedItems[item.name.toLowerCase()]}
              handleClick={({ cost, name }) => {
                if (numCookies < cost) {
                  window.alert("You can't afford it!");
                } else {
                  setNumCookies(numCookies - cost);
                  setPurchasedItems({
                    ...purchasedItems,
                    [name.toLowerCase()]:
                      purchasedItems[name.toLowerCase()] + 1,
                  });
                }
              }}
              isFirst={index === 0}
            />
          );
        })}
      </ItemArea>
      <HomeLink to="/">Return home</HomeLink>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
`;
const GameArea = styled.div`
  flex: 1;
  display: grid;
  place-items: center;
`;
const Button = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
`;

const Cookie = styled.img`
  width: 200px;
`;

const ItemArea = styled.div`
  height: 100%;
  padding-right: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const SectionTitle = styled.h3`
  text-align: center;
  font-size: 32px;
  color: yellow;
`;

const Indicator = styled.div`
  position: absolute;
  width: 250px;
  top: 0;
  left: 0;
  right: 0;
  margin: auto;
  text-align: center;
`;

const Total = styled.h3`
  font-size: 28px;
  color: lime;
`;

const HomeLink = styled(Link)`
  position: absolute;
  top: 15px;
  left: 15px;
  color: #666;
`;

export default Game;
