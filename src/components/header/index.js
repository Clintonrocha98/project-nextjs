import Link from "next/link";
import styles from "./styles.module.scss";
import LogoIcon from "@/assets/SVG/logo";
export default function Header() {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;

    const currentDate = `${currentYear}-${currentMonth}`;
    return (
        <>
            <header className={styles.header}>
                <nav>
                    <LogoIcon />

                    <ul>
                        <li>
                            <Link href="/">Home</Link>
                        </li>
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
