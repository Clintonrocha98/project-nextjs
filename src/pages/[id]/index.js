import ImageCard from "@/components/imageCard";

export default function AstronomyPicture({ data }) {
    return <>{<ImageCard data={data}></ImageCard>}</>;
}

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
