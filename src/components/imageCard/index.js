import styles from "./styles.module.scss";

export default function ImageCard({ data, children }) {
    return (
        <>
            <section className={styles.today}>
                {children}
                {data && (
                    <div className={styles.containerToday}>
                        {data.media_type === "image" && (
                            <img
                                src={data.url}
                                alt={data.title}
                                key={data.date}
                                title={data.title}
                            />
                        )}
                        {data.media_type === "video" && (
                            <iframe
                                title={data.title}
                                src={data.url}
                                allowFullScreen
                                key={data.date}
                            />
                        )}
                        <div className={styles.warrapDescription}>
                            <h2>{data.date?.replace(/-/g, "/")}</h2>
                            <h2>{data.title}</h2>
                            <p>{data.explanation}</p>
                            <br />
                            {data?.copyright && (
                                <p>Copyright: {data?.copyright}</p>
                            )}
                        </div>
                    </div>
                )}
            </section>
        </>
    );
}
