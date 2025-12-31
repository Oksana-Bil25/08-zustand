import React from "react";
import styles from "./LayoutNotes.module.css";

export default function FilterLayout({
  children,
  sidebar,
}: {
  children: React.ReactNode;
  sidebar: React.ReactNode;
}) {
  return (
    <div className={styles.layoutContainer}>
      <aside className={styles.sidebarArea}>{sidebar}</aside>

      <main className={styles.contentArea}>{children}</main>
    </div>
  );
}
