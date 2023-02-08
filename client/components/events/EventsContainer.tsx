import axios from "axios";
import React, { useEffect, useState } from "react";
import EventCard from "./EventCard";

export default function EventsContainer() {
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    async function getData() {
      const req = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/event`
      );

      const data = req.data;

      setEvents(data.events);
    }

    getData();
  }, []);

  return (
    <section className="py-10">
      {events.length !== 0 && (
        <h1 className="text-center text-indigo-600 text-2xl font-slab font-bold">
          Eventos
        </h1>
      )}

      <div className="flex flex-wrap items-center justify-center">
        {events.map((event) => {
          return <EventCard key={event._id} {...event} />;
        })}
      </div>
    </section>
  );
}
