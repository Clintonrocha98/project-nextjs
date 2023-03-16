import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import moment from "moment";

const Calendar = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        // carregar os eventos do servidor ou de uma API externa
        setEvents([
            {
                title: "Evento 1",
                start: moment("2023-03-17T10:00:00"),
                end: moment("2023-03-17T12:00:00"),
            },
            {
                title: "Evento 2",
                start: moment("2023-03-18T14:00:00"),
                end: moment("2023-03-18T16:00:00"),
            },
        ]);
    }, []);

    return (
        <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin]}
            initialView="dayGridMonth"
            events={events}
        />
    );
};

export default Calendar;
