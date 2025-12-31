import React from "react";
import styles from "./LoadingIndicator.module.css";

const LoadingIndicator: React.FC = () => (
  <div className={styles.loading}>
    <div className={styles.spinner} />
    <span className={styles.text}>Loading...</span>
  </div>
);

export default LoadingIndicator;
