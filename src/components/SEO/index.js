import Head from "next/head";

export default function SEO({ tabName = "", title, description }) {
    const titleTab = `SkyScope | ${tabName || title}`;
    return (
        <Head>
            <title>{titleTab}</title>
            <meta name="title" content={title} />
            <meta name="description" content={description} />
        </Head>
    );
}
