import Link from "next/link";
import styles from "./styles.module.scss";
import LogoIcon from "@/assets/SVG/logo";
export default function Header() {
    return (
        <>
            <header className={styles.header}>
                <nav>
                    <Link href="/">
                        <LogoIcon />
                    </Link>
                    <ul>
                        <li>
                            <Link href="/search">Search</Link>
                        </li>
                        <li>
                            <Link href="/calendar">Calendar</Link>
                        </li>
                    </ul>
                </nav>
            </header>
        </>
    );
}
