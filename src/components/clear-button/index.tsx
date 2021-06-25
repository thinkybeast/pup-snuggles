import React, { useContext } from "react";
import SearchContext from "../../context/searchContext";

import * as styles from "./clear-button.module.scss";

function ClearButton() {
  const { setLocation, setBreed, setFireSearch, fireSearch } =
    useContext(SearchContext);

  return (
    <button
      className={styles.clearButton}
      onClick={() => {
        setLocation("");
        setBreed("All Breeds");
        setFireSearch(!fireSearch);
      }}
    >
      Clear
    </button>
  );
}

export default ClearButton;
