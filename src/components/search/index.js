import { useState } from "react";
import { useRouter } from "next/router";

export default function Search() {
    const [date, setDate] = useState("");
    const router = useRouter();

    function handleDateChange({ target }) {
        setDate(target.value);
    }

    function handleSearch() {
        router.push(`/${date}`);
    }

    return (
        <>
            <input type="date" value={date} onChange={handleDateChange} />
            <button onClick={handleSearch}>Search</button>
        </>
    );
}
