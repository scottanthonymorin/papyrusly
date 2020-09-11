import React from "react";
import SidebarTab from "./SidebarTab";
import { useSelector } from "react-redux";

const OverviewList = ({ selectedTab, SetSelectedTab }) => {
  const overviewTabs = useSelector((state) => Object.keys(state.overview));
  return overviewTabs.map((tab) => {
    return (
      <SidebarTab
        content={tab}
        selectedTab={selectedTab}
        SetSelectedTab={SetSelectedTab}
      />
    );
  });
};

export default OverviewList;
