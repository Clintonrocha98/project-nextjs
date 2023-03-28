import NewCalendar from "@/components/newCalendar";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Rocket from "@/assets/SVG/rocket";
import styles from "./styles.module.scss";

// export async function getServerSideProps(context) {
//     const data = context.params;

//     const [currentYear, currentMonth] = data.month.split("-");

//     const currentDate = new Date();
//     const month = currentDate.getMonth() + 1;

//     const startDate = `${currentYear}-${currentMonth}-01`;

//     const lastDayOfMonth = new Date(currentYear, currentMonth, 0).getDate();

//     const lastDay =
//         month === +currentMonth ? currentDate.getDate() : lastDayOfMonth;

//     const endDate = `${currentYear}-${currentMonth}-${lastDay}`;

//     const response = await fetch(
//         `https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_KEY}&start_date=${startDate}&end_date=${endDate}`
//     );
//     const dataMonth = await response.json();

//     return {
//         props: {
//             dataMonth,
//             currentYear,
//             currentMonth,
//         },
//     };
// }

export default function MonthPage() {
    const router = useRouter();

    if (!router.query.month) {
        return (
            <div className={styles.loading}>
                <div className={styles.bg}></div>
                <Rocket />
            </div>
        );
    }
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [dataMonth, setDataMonth] = useState(null);
    const [currentYear, currentMonth] = router.query.month.split("-");

    const currentDate = new Date();
    const month = currentDate.getMonth() + 1;

    const startDate = `${currentYear}-${currentMonth}-01`;

    const lastDayOfMonth = new Date(currentYear, currentMonth, 0).getDate();

    const lastDay =
        month === +currentMonth ? currentDate.getDate() : lastDayOfMonth;

    const endDate = `${currentYear}-${currentMonth}-${lastDay}`;

    useEffect(() => {
        async function FetchData() {
            try {
                const response = await fetch(
                    `https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_KEY}&start_date=${startDate}&end_date=${endDate}`
                );
                const dataMonth = await response.json();
                setDataMonth(dataMonth);
                setLoading(false);
            } catch (error) {
                setError(true);
                setLoading(false);
            }
        }
        FetchData();
    }, [router.query.month]);

    if (loading) {
        return (
            <div className={styles.loading}>
                <div className={styles.bg}></div>
                <Rocket />
            </div>
        );
    }

    if (error) {
        return <div>Error when loading the data.</div>;
    }

    return (
        <NewCalendar
            key={`${currentYear}-${currentMonth}`}
            year={currentYear}
            month={currentMonth}
            imageUrl={dataMonth}
        />
    );
}
