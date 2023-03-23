import Link from "next/link";
import { useRouter } from "next/router";
import SEO from "../SEO";
import styles from "./styles.module.scss";

function createCalendarData(year, month, imageUrl) {
    const daysInMonth = new Date(year, month, 0).getDate();
    const firstDayOfMonth = new Date(year, month - 1, 1).getDay();
    const currentDate = new Date().getDate();

    const data = [];
    const imageUrls = [];
    const apiDate = [];
    const apiTitle = [];
    const apiType = [];

    let day = 1;

    for (let i = 0; i < 6; i++) {
        const week = [];
        const weekUrls = [];
        const dateImage = [];
        const titleImage = [];
        const type = [];

        for (let j = 0; j < 7; j++) {
            if ((i === 0 && j < firstDayOfMonth) || day > daysInMonth) {
                week.push(null);
                weekUrls.push(null);
                dateImage.push(null);
                titleImage.push(null);
                type.push(null);
            } else {
                week.push(day);
                weekUrls.push(day > currentDate ? "" : imageUrl[day - 1].url);
                dateImage.push(day > currentDate ? "" : imageUrl[day - 1].date);
                titleImage.push(
                    day > currentDate ? "" : imageUrl[day - 1].title
                );
                type.push(
                    day > currentDate ? "" : imageUrl[day - 1].media_type
                );
                day++;
            }
        }

        data.push(week);
        imageUrls.push(weekUrls);
        apiDate.push(dateImage);
        apiTitle.push(titleImage);
        apiType.push(type);

        if (day > daysInMonth) break;
    }

    return { data, imageUrls, apiDate, apiTitle, apiType };
}

function DayCell({
    weekIndex,
    dayIndex,
    imageUrl,
    apiDate,
    apiTitle,
    apiType,
}) {
    const isImage = apiType[weekIndex][dayIndex] === "image";
    const isVideo = apiType[weekIndex][dayIndex] === "video";
    const isMedia = isImage || isVideo;

    const cellContent = isMedia ? (
        isImage ? (
            <Link
                href={`/${apiDate[weekIndex][dayIndex]}`}
                key={apiTitle[weekIndex][dayIndex]}
            >
                <img
                    src={imageUrl[weekIndex][dayIndex]}
                    title={`date: ${apiDate[weekIndex][dayIndex]} - ${apiTitle[weekIndex][dayIndex]}`}
                />
            </Link>
        ) : (
            <iframe
                src={imageUrl[weekIndex][dayIndex]}
                alt={apiTitle[weekIndex][dayIndex]}
                title={`date: ${apiDate[weekIndex][dayIndex]} - ${apiTitle[weekIndex][dayIndex]}`}
                allowFullScreen
            />
        )
    ) : (
        <span>{apiTitle[weekIndex][dayIndex]}</span>
    );

    return <td>{cellContent}</td>;
}

export default function NewCalendar({ year, month, imageUrl }) {
    const { data, imageUrls, apiDate, apiTitle, apiType } = createCalendarData(
        year,
        month,
        imageUrl
    );
    const router = useRouter();
    const currentMonth = new Date().getMonth() + 1;

    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    function previousMonth() {
        if (month === 1) {
            router.push(`/calendar/${year - 1}-12`);
        } else {
            router.push(`/calendar/${year}-${month - 1}`);
        }
    }

    function nextMonth() {
        if (month === 12) {
            router.push(`/calendar/${year + 1}-1`);
        } else {
            router.push(`/calendar/${year}-${+month + 1}`);
        }
    }

    return (
        <>
            <SEO
                title={`${year}-${months[month - 1]}`}
                description={`calendar of the month of ${
                    months[month - 1]
                } with the astronomical images of each day  `}
            />
            <section className={styles.containerCalendar}>
                <div>
                    <div>
                        <h1>{`${months[month - 1]}/${year}`}</h1>
                        <div>
                            <button onClick={previousMonth}>anterior</button>
                            <button
                                onClick={nextMonth}
                                disabled={currentMonth == month}
                            >
                                proximo
                            </button>
                        </div>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>Sun</th>
                                <th>Mon</th>
                                <th>Tue</th>
                                <th>Wed</th>
                                <th>Thu</th>
                                <th>Fri</th>
                                <th>Sat</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((week, weekIndex) => (
                                <tr key={weekIndex}>
                                    {week.map((day, dayIndex) => (
                                        <DayCell
                                            key={`${weekIndex}-${dayIndex}`}
                                            weekIndex={weekIndex}
                                            dayIndex={dayIndex}
                                            imageUrl={imageUrls}
                                            apiDate={apiDate}
                                            apiTitle={apiTitle}
                                            apiType={apiType}
                                        />
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </>
    );
}
