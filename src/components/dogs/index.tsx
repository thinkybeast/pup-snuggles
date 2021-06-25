import React, { useState, useContext } from "react";
import Toolbar from "../toolbar";
import Loader from "../loader";
import Dog from "../dog";

import * as styles from "./dogs.module.scss";
import SearchContext from "../../context/searchContext";

function Dogs() {
  const { fireSearch, location, breed } = useContext(SearchContext);
  const [isLoading, setIsLoading] = useState(false);
  const [dogData, setDogData] = useState(null);

  React.useEffect(() => {
    setIsLoading(true);
    const fetchDogs = async () => {
      const res = await fetch(
        `/api/getAvailableDogs?zip=${location}&breed=${breed}`
      ).then((res) => res.json());

      setDogData(res);
    };

    fetchDogs();
  }, []);

  const breedList = dogData?.map(({ breed }) => breed);
  const uniqueBreeds = [...new Set(breedList)];
  return (
    <>
      <section style={{ maxWidth: `1024px`, margin: `0 auto` }}>
        <Toolbar breeds={uniqueBreeds} />
        {isLoading ? (
          <Loader />
        ) : (
          <section className={styles.dogList}>
            {dogData?.map((dog, i) => {
              return <Dog key={`${dog.breed}${i}`} dog={dog} i={i} />;
            })}
          </section>
        )}
      </section>
    </>
  );
}

export default Dogs;
