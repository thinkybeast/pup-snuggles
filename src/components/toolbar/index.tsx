import React, { useContext } from "react";

import Location from "../location";
import Breed from "../breed";
import SearchButton from "../search-button";

import * as styles from "./toolbar.module.scss";
import SearchContext from "../../context/searchContext";
import ClearButton from "../clear-button";

const Toolbar = ({ breeds }) => {
  const { location, breed } = useContext(SearchContext);
  return (
    <div className={styles.toolbar}>
      <Location />
      <Breed breeds={breeds} />
      <SearchButton />
      {(location || breed !== "All Breeds") && <ClearButton />}
    </div>
  );
};

export default Toolbar;
