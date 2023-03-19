import Calendar from "@/components/calendar";

export async function getServerSideProps(context) {
    const data = context.params;

    const [currentYear, currentMonth] = data.month.split("-");

    const currentDate = new Date();

    const startDate = `${currentYear}-${currentMonth}-01`;

    const lastDayOfMonth = new Date(currentYear, currentMonth, 0).getDate();
    const lastDay = Math.min(currentDate.getDate(), lastDayOfMonth);

    const endDate = `${currentYear}-${currentMonth}-${lastDay}`;

    const response = await fetch(
        `https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_KEY}&start_date=${startDate}&end_date=${endDate}`
    );
    const dataMonth = await response.json();

    return {
        props: {
            dataMonth,
            currentYear,
            currentMonth,
            data,
        },
    };
}
export default function MonthPage({ dataMonth, currentYear, currentMonth }) {
    return (
        <>
            <Calendar
                currentYear={currentYear}
                currentMonth={currentMonth}
                events={dataMonth}
            />
        </>
    );
}
