
import Calendar from "@/components/calendar";

function CurrentDate() {
    const currentDate = new Date();
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;

    const startDate = `${currentYear}-${currentMonth}-01`;

    const lastDayOfMonth = new Date(currentYear, currentMonth, 0).getDate();
    const lastDay = Math.min(currentDate.getDate(), lastDayOfMonth);

    const endDate = `${currentYear}-${currentMonth}-${lastDay}`;

    return { startDate, endDate, currentYear, currentMonth };
}

export async function getServerSideProps() {
    const { startDate, endDate, currentYear, currentMonth } = CurrentDate();

    const response = await fetch(
        `https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_KEY}&start_date=${startDate}&end_date=${endDate}`
    );
    const dataMonth = await response.json();

    return {
        props: {
            dataMonth,
            currentYear,
            currentMonth,
        },
    };
}

export default function CalendarPage({ dataMonth, currentYear, currentMonth }) {
    return (
        <>
            <Calendar
                events={dataMonth}
                currentMonth={currentMonth}
                currentYear={currentYear}
            />
        </>
    );
}
