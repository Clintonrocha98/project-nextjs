import ImageCard from "@/components/imageCard";
export async function getStaticProps() {
    const data = await fetch(
        `https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_KEY}`
    );
    const nasa = await data.json();

    return { props: { nasa } };
}
export default function Today({ nasa }) {
    return (
        <>
            <ImageCard data={nasa}>
                
                <h1>
                    A different image or photograph of our fascinating universe
                    is featured, along with a brief explanation written by a
                    professional astronomer.
                </h1>
            </ImageCard>
        </>
    );
}
