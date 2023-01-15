import { useEffect, useState } from "react";
import { decodeToken } from "./decodeToken";

export function useUserRole() {
  const [role, setRole] = useState<"admin" | "administrator" | "student">(
    "student"
  );

  useEffect(() => {
    const token = window.localStorage.getItem("token");

    if (token) {
      const user = decodeToken(token);

      setRole(user.role);
    }
  }, []);

  return [role, setRole];
}
