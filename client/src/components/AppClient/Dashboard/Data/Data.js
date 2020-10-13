import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import OddsTab from "./OddsTab";
import { getFetch } from "../../../../helpers/getFetch";

const Data = () => {
  const [oddsArray, SetOddsArray] = React.useState([]);
  const selectedCategory = useSelector((state) => state.selectedCategory);
  console.log(selectedCategory);

  React.useEffect(() => {
    const scrape = async () => {
      const response = await fetch(`/api/getOddsData/${selectedCategory}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
    };

    // const interval = setInterval(async () => {
    //   scrape();
    //   console.log("scraping");
    // }, 10000);

    // return () => clearInterval(interval);
  }, []);

  return oddsArray.map((game, index) => {
    return <OddsTab game={game} key={index} />;
  });
};

export default Data;
