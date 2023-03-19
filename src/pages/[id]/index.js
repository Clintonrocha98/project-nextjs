import ImageCard from "@/components/imageCard";
import Search from "@/components/search";

export async function getServerSideProps({ params }) {
    const data = await fetch(
        `https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_KEY}&thumbs=false&date=${params.id}`
    );
    const nasa = await data.json();

    return {
        props: {
            data: nasa,
        },
    };
}

export default function AstronomyPicture({ data }) {
    return (
        <>
            <ImageCard data={data}>
                <Search />
            </ImageCard>
        </>
    );
}
