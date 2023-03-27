import { useState } from "react";
import { useRouter } from "next/router";

import styles from "./styles.module.scss";

export default function Search() {
    const [date, setDate] = useState(null);
    const router = useRouter();

    function handleDateChange({ target }) {
        setDate(target.value);
    }

    function handleSearch() {
        date && router.push(`/${date}`);
    }

    return (
        <div className={styles.containerSearch}>
            <h2>Current date through June 16, 1995</h2>
            <div>
                <input type="date" value={date} onChange={handleDateChange} />
                <button onClick={handleSearch}>Search</button>
            </div>
        </div>
    );
}
