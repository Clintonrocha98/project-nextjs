import { useMemo } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import styles from "./styles.module.scss";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

export default function Calendar({ events, currentMonth, currentYear }) {
    const eventsAPI = useMemo(() => {
        return {
            events: events.map((event) => ({
                title: event.title,
                start: event.date,
                end: event.date,
                imageUrl: event.url,
                type: event.media_type,
            })),
        };
    }, [events]);

    const eventContent = (eventInfo) => {
        const mediaContent =
            eventInfo.event.extendedProps.imageUrl &&
            eventInfo.event.extendedProps.type === "image" ? (
                <Link href={`/calendar/${eventInfo.event.start}`}>
                    <img
                        src={eventInfo.event.extendedProps.imageUrl}
                        alt={eventInfo.event.title}
                        title={eventInfo.event.title}
                    />
                </Link>
            ) : eventInfo.event.extendedProps.imageUrl &&
              eventInfo.event.extendedProps.type === "video" ? (
                <Link href={`/calendar/${eventInfo.event.start}`}>
                    <iframe
                        src={eventInfo.event.extendedProps.imageUrl}
                        alt={eventInfo.event.title}
                        title={eventInfo.event.title}
                        allowFullScreen
                    />
                </Link>
            ) : (
                <span>{eventInfo.event.title}</span>
            );

        return mediaContent;
    };
    const router = useRouter();
    const month = new Date().getMonth() + 1;
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
        if (currentMonth === 1) {
            router.push(`/calendar/${currentYear - 1}-12`);
        } else {
            router.push(`/calendar/${currentYear}-${currentMonth - 1}`);
        }
    }

    function nextMonth() {
        if (currentMonth === 12) {
            router.push(`/calendar/${currentYear + 1}-1`);
        } else {
            router.push(`/calendar/${currentYear}-${currentMonth + 1}`);
        }
    }

    return (
        <>
            <Head>
                <title>{`${
                    months[currentMonth - 1]
                }/${currentYear} | SkyScope`}</title>
            </Head>
            <section className={styles.containerCalendar}>
                <div>
                    <h1>{`${months[currentMonth - 1]}/${currentYear}`}</h1>
                    <div>
                        <button onClick={previousMonth}>anterior</button>
                        <button
                            onClick={nextMonth}
                            disabled={month === currentMonth}
                        >
                            proximo
                        </button>
                    </div>
                </div>
                <FullCalendar
                    plugins={[dayGridPlugin]}
                    initialView="dayGridMonth"
                    events={eventsAPI}
                    eventContent={eventContent}
                    headerToolbar
                />
            </section>
        </>
    );
}
