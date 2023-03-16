import Footer from "../footer";
import Header from "../header";

import styles from "./styles.module.scss";
export default function ContainerApp({ className, children }) {
  return (
    <>
      <div className={`${className} ${styles.app}`}>
        <Header />
        {children}
        <Footer />
      </div>
    </>
  );
}
