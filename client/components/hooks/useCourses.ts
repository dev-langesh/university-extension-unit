import axios from "axios";
import { useEffect, useState } from "react";

export default function useCourses() {
  const [courses, setCourses] = useState<any>([]);

  useEffect(() => {
    async function getData() {
      const token = window.localStorage.getItem("token");

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const req = await axios.get("http://localhost:8000/course", config);

      const data = req.data;

      setCourses(data);
    }

    getData();
  }, []);

  return courses;
}
