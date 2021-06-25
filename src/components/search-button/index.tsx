import React, { useContext } from "react";
import SearchContext from "../../context/searchContext";

import * as styles from "./search-button.module.scss";

function SearchButton() {
  const { fireSearch, setFireSearch } = useContext(SearchContext);
  return (
    <button
      className={styles.searchButton}
      onClick={() => setFireSearch(!fireSearch)}
    >
      Search
    </button>
  );
}

export default SearchButton;
