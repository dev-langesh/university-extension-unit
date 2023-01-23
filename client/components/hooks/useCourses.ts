import axios from "axios";
import { useEffect, useState } from "react";

export default function useCourses() {
  const [courses, setCourses] = useState<any>([]);

  useEffect(() => {
    async function getData() {
      const token = window.localStorage.getItem("token");

      if (!token) {
        return [];
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const req = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/course`,
        config
      );

      const data = req.data;

      setCourses(data);
    }

    getData();
  }, []);

  return courses;
}
