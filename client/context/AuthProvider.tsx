import { useRouter } from "next/router";
import React, { createContext, useEffect, useState } from "react";
import { decodeToken } from "../components/hooks/decodeToken";

export const AuthContext = createContext("");

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<string>("");

  const router = useRouter();

  useEffect(() => {
    const token = window?.localStorage?.getItem("token");

    if (token) {
      const user = decodeToken(token);

      setUser(user.role);
    } else {
      const whitelist = ["/", "/auth/verify-email", "/auth/reset-password"];
      if (!whitelist.includes(router.pathname)) {
        router.push("/auth/login");
      }
    }
  }, []);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
}
