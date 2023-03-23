import Link from "next/link";
import styles from "./styles.module.scss";
import LogoIcon from "@/assets/SVG/logo";
export default function Header() {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;

    const currentDate = `${currentYear}-${currentMonth}-01`;
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
                            <Link href={`/calendar/${currentDate}`}>
                                Calendar
                            </Link>
                        </li>
                    </ul>
                </nav>
            </header>
        </>
    );
}
