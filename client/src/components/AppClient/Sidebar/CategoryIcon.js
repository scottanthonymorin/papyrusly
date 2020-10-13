import React from "react";

import { GiSoccerBall } from "react-icons/gi";
import { BiTennisBall } from "react-icons/bi";
import { FaHockeyPuck } from "react-icons/fa";
import { BiBaseball } from "react-icons/bi";
import { BiBasketball } from "react-icons/bi";
import { FaFootballBall } from "react-icons/fa";

export default function (content) {
  switch (content) {
    case "soccer":
      return <GiSoccerBall />;
    case "tennis":
      return <BiTennisBall />;
    case "hockey":
      return <FaHockeyPuck />;
    case "baseball":
      return <BiBaseball />;
    case "basketball":
      return <BiBasketball />;
    case "football":
      return <FaFootballBall />;
    default:
      return "";
  }
}
