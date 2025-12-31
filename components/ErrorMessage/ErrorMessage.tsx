import React from "react";
import styles from "./ErrorMessage.module.css";

interface ErrorMessageProps {
  message?: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message = "Something went wrong",
}) => {
  return <div className={styles.error}>{message}</div>;
};

export default ErrorMessage;
