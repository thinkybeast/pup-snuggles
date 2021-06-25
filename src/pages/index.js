import React, { useState } from "react";
import Dogs from "../components/dogs";

import "../assets/fonts/futura-pt/Webfonts/futurapt_book_macroman/stylesheet.css";
import "../assets/fonts/futura-pt/Webfonts/futurapt_demi_macroman/stylesheet.css";
import "../assets/fonts/futura-pt/Webfonts/futurapt_bold/stylesheet.css";

import Layout from "../components/layout";
import SearchContext from "../context/searchContext";

function Catalog() {
  const [location, setLocation] = useState("");
  const [breed, setBreed] = useState("All Breeds");
  const [fireSearch, setFireSearch] = useState(false);

  return (
    <SearchContext.Provider
      value={{
        location,
        breed,
        fireSearch,
        setLocation,
        setBreed,
        setFireSearch,
      }}
    >
      <Layout title="Our Snugglers" active="home">
        <main>
          <title>Pup Snuggles</title>
          <Dogs />
        </main>
      </Layout>
    </SearchContext.Provider>
  );
}

export default function App() {
  return <Catalog />;
}
