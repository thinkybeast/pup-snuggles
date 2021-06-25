import React, { useContext, useEffect } from "react";
import { Listbox, ListboxOption } from "@reach/listbox";
import VisuallyHidden from "@reach/visually-hidden";

import "@reach/listbox/styles.css";
import * as styles from "./breed.module.scss";
import SearchContext from "../../context/searchContext";

// This should probably be static list vs. prop.
const Breed = ({ breeds }) => {
  const { setBreed, breed } = useContext(SearchContext);

  return (
    <div className={styles.breed}>
      <VisuallyHidden id="breed-list">All Breeds</VisuallyHidden>
      <Listbox
        aria-labelledby="breed-list"
        value={breed}
        onChange={(val) => {
          setBreed(val);
        }}
      >
        <ListboxOption key="default" value="All Breeds">
          All Breeds
        </ListboxOption>
        {breeds.map((breed) => {
          return (
            <ListboxOption key={breed} value={breed}>
              {breed}
            </ListboxOption>
          );
        })}
      </Listbox>
    </div>
  );
};

export default Breed;
