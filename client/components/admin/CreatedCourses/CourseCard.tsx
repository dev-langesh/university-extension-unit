import React from "react";

type propType = {
  title: string;
  sub_title: string;
  img: string;
};

export default function CourseCard({ title, sub_title, img }: propType) {
  return (
    <div className="w-72 h-60 shadow-xl m-4">
      <div className="w-full h-1/2">
        <img className="object-contain w-full h-full" src={img} alt="" />
      </div>
      <main className="p-3 space-y-2">
        <h1 className="font-slab  font-bold">{title}</h1>
        <h3 className="text-sm text-slate-600">{sub_title}</h3>
      </main>
    </div>
  );
}
