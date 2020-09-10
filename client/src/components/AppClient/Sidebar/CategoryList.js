import React from "react";
import { useSelector } from "react-redux";
import SidebarTab from "./SidebarTab";

const CategoryList = () => {
  //Copy Section
  //Category component with subtitle and list of categories
  const categoryTabs = useSelector((state) => Object.keys(state.categories));
  return categoryTabs.map((tab) => {
    return <SidebarTab>{tab}</SidebarTab>;
  });
};

export default CategoryList;
