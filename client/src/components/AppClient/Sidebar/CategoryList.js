import React from "react";
import { useSelector } from "react-redux";
import CategoryTab from "./CategoryTab";

const CategoryList = ({ selectedTab, SetSelectedTab }) => {
  const categoryTabs = useSelector((state) => Object.keys(state.categories));
  return categoryTabs.map((title, index) => {
    return (
      <CategoryTab
        selectedTab={selectedTab}
        SetSelectedTab={SetSelectedTab}
        key={index}
        content={title}
      />
    );
  });
};

export default CategoryList;
