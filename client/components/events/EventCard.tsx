import React from "react";

export default function CourseCard(props: any) {
  return (
    <div className="w-72 shadow-xl m-4 p-2">
      <div className="w-full h-1/2">
        <img className="object-contain w-full h-full" src={props.img} alt="" />
      </div>
      <main className="p-3 space-y-2">
        <h1 className="font-slab text-indigo-600  font-bold">{props.name}</h1>
        <h3 className="text-sm text-slate-600">{props.desc}</h3>
      </main>
    </div>
  );
}
