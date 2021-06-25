import React from "react";
import * as styles from "./dog.module.scss";

function Dog({ dog }) {
  const buttonLabel = `Snuggle Me`;

  return (
    <div className={styles.dogCard}>
      <img className={styles.dogImage} src={dog?.imageUrl} alt={dog?.name} />
      <p className={styles.dogCardName}>{dog?.name || `Good Boy`}</p>
      <p className={styles.dogCardBreed}>{dog?.breed}</p>
      <p className={styles.dogCardLocation}>{dog?.city}</p>
      <button
        className={styles.snugButton}
        onClick={() => {
          alert(`${dog?.name || "Good Boy"} wags their tail happily!`);
        }}
      >
        {buttonLabel}
      </button>
    </div>
  );
}

export default Dog;
