import ImageCard from "@/components/imageCard";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Search() {
    const [date, setDate] = useState("");
    const [img, setImg] = useState(null);
    const router = useRouter();

    function handleDateChange({ target }) {
        setDate(target.value);
    }

    function handleSearch() {
        fetch(
            `https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_KEY}&thumbs=false&date=${date}`
        )
            .then((response) => response.json())
            .then((data) => {
                router.push(`/${date}`);
            })
            .then((data) => setImg(data))
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <>
            <input type="date" value={date} onChange={handleDateChange} />
            <button onClick={handleSearch}>Search</button>
            {img && <ImageCard data={img}></ImageCard>}
        </>
    );
}
