import ImageCard from "@/components/imageCard";
import Search from "@/components/search";

export async function getServerSideProps() {
    const data = await fetch(
        `https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_KEY}&thumbs=false&count=2`
    );
    const nasa = await data.json();

    return {
        props: {
            data: nasa,
        },
    };
}

export default function SearchPage({ data }) {
    return (
        <>
            <ImageCard data={data[0]}>
                <Search />
            </ImageCard>
        </>
    );
}
