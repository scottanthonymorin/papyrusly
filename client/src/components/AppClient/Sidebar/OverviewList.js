import React from "react";
import SidebarTab from "./SidebarTab";
import { useSelector } from "react-redux";

const OverviewList = () => {
  const overviewTabs = useSelector((state) => Object.keys(state.overview));
  return overviewTabs.map((tab) => {
    return <SidebarTab content={tab} />;
  });
};

export default OverviewList;
