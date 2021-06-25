import React, { useEffect, useState, useContext } from "react";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";
import SearchContext from "../../context/searchContext";

import Icon from "../../assets/location.inline.svg";
import * as styles from "./location.module.scss";

const cache = {};
const searchZips = (value) => {
  // Get cached array is present to avoid API call.
  if (cache[value]) {
    return Promise.resolve(cache[value]);
  }
  // Otherwise, hit Gatsby Function, passing search string in.
  return fetch("/api/zipcode?zip=" + value)
    .then((res) => res.json())
    .then((result) => {
      // Set cache result.
      cache[value] = result;
      return result;
    });
};

const useZipSearch = (zip) => {
  const [zips, setZips] = useState([]);

  // When the zip changes, if its not an empty string, search them.
  useEffect(() => {
    if (zip.trim() !== "") {
      let isFresh = true;
      searchZips(zip).then((zips) => {
        // Then set results in to state.
        if (isFresh) setZips(zips);
      });
      // Cleanup function.
      return () => (isFresh = false);
    }
  }, [zip]);
  return zips;
};

const Location = () => {
  const [zip, setZip] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { location, setLocation } = useContext(SearchContext);

  // Search hook triggered by input value in state.
  const zips = useZipSearch(zip);
  // When input changes.
  const handleZipChange = (e) => {
    // If less than two chars, set loading state and early return to avoid API call.
    if (e.target.value.length <= 2) {
      setIsLoading(true);
      setLocation(e.target.value);
      return;
    }
    // If long enough input, but also no results, clear loading state.
    if (zips.length === 0 && e.target.value.length > 2) {
      setIsLoading(false);
    }
    // Set zip value to trigger useZipSearch hook.
    setZip(e.target.value);
    // Set location, to keep input controlled
    setLocation(e.target.value);
  };

  // Clear loading when there are results.
  useEffect(() => {
    if (zips.length > 0) {
      setIsLoading(false);
    }
  }, [zips.length]);

  return (
    <div className={styles.location}>
      <Combobox
        aria-label="zips"
        onSelect={(val) => {
          setLocation(val);
        }}
      >
        <ComboboxInput
          className="zip-search-input"
          onChange={handleZipChange}
          value={location}
          placeholder="Location (Zip Code)"
        />
        {isLoading ? (
          <ComboboxPopover className="shadow-popup">
            <span style={{ display: "block", margin: 8 }}>Loading...</span>
          </ComboboxPopover>
        ) : zips.length > 0 ? (
          <ComboboxPopover className="shadow-popup">
            <ComboboxList>
              {zips.map((zip) => {
                return <ComboboxOption key={zip.zipCode} value={zip.zipCode} />;
              })}
            </ComboboxList>
          </ComboboxPopover>
        ) : (
          <ComboboxPopover className="shadow-popup">
            <span style={{ display: "block", margin: 8 }}>
              No results found
            </span>
          </ComboboxPopover>
        )}
        <Icon className={styles.icon} />
      </Combobox>
    </div>
  );
};

export default Location;
