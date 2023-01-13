import "../styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "../components/navbar/index";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="font-roboto overflow-y-auto">
      <Navbar />
      <Component {...pageProps} />
    </div>
  );
}
