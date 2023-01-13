import React from "react";
import LinkButton from "../common/buttons/LinkButton";
import Features from "./Features";

export default function Banner() {
  return (
    <section className="p-6 flex flex-col md:flex-row items-center md:justify-around mt-10 space-y-20 md:space-y-0">
      <section className="md:w-1/2 space-y-6 text-center">
        <h1 className="font-slab text-2xl text-indigo-600 md:text-3xl font-bold tracking-wide ">
          Unidad de extensión universitaria
        </h1>
        <p>
          Nuestra herramienta segura y fácil de usar ayuda a los educadores a
          administrar, medir y enriquecer las experiencias de aprendizaje. Puede
          dar actividades para los estudiantes y controlar fácilmente el estado
          de envío.
        </p>
        <br />
        <LinkButton
          href="/auth/login"
          text="Empezar"
          variant="contained"
          color="indigo"
          size="large"
        />
      </section>

      <section className="relative">
        <img
          className="relative w-72 h-60 md:w-96 md:h-72 object-cover"
          src="/images/classroom.jpg"
          alt="Classroom"
        />
        <div className="w-72 h-60 md:w-96 md:h-72 absolute bg-gradient-to-br from-blue-500 to-indigo-500 top-3 -left-3 -z-10 "></div>
      </section>
    </section>
  );
}
