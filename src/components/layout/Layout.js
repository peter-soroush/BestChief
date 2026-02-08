import React from "react";
import styles from "../../styles/Layout.module.css";
import Link from "next/link";
function Layout({ children }) {
  return (
    <>
      <header className={styles.header}>
        <div className={styles.left}>
          <Link href="/">Best Chief</Link>
        </div>
        <div className={styles.right}>
          <Link href="/menu">Menu</Link>
          <Link href="/categories">Categories</Link>
        </div>
      </header>
      <div className={styles.container}>{children}</div>
      <footer className={styles.footer}>
        <a href="https://arsoroush.com" target="_blank">
          ARSoroush |
        </a>
        NextJs Course | BestChief Project &copy; {new Date().getFullYear()}
      </footer>
    </>
  );
}

export default Layout;
