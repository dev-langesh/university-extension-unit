import React, { createContext, useState } from "react";

export const CourseContext = createContext({});

export default function CourseProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [page, setPage] = useState<"activity" | "participants">("activity");
  return (
    <CourseContext.Provider value={{ page, setPage }}>
      {children}
    </CourseContext.Provider>
  );
}
