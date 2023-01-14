import "../styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "../components/navbar/index";
import { decodeToken } from "../components/hooks/decodeToken";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import AuthProvider from "../context/AuthProvider";
import { Provider } from "react-redux";
import { store } from "../src/app/store";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <AuthProvider>
        <div className="font-roboto overflow-y-auto">
          <Navbar />
          <Component {...pageProps} />
        </div>
      </AuthProvider>
    </Provider>
  );
}
