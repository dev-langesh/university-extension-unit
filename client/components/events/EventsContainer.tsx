import axios from "axios";
import React, { useEffect, useState } from "react";
import EventCard from "./EventCard";

export default function EventsContainer() {
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    async function getData() {
      const req = await axios.get("http://localhost:8000/event");

      const data = req.data;

      setEvents(data.events);
    }

    getData();
  }, []);

  return (
    <section className="pb-10">
      <h1 className="text-center text-indigo-600 text-2xl font-slab font-bold">
        Eventos
      </h1>

      {events.map((event) => {
        return <EventCard {...event} />;
      })}
    </section>
  );
}
