import Link from "next/link";
import React, { useEffect, useState } from "react";

type LinkButtonType = {
  href: string;
  text: string;
  variant: "contained" | "outlined";
};

export default function LinkButton({ href, text, variant }: LinkButtonType) {
  const [style, setStyle] = useState<string>();

  const outlinedStyle = "border-white text-white";
  const containedStyle = "border-transparent bg-white text-indigo-600";

  useEffect(() => {
    variant === "contained"
      ? setStyle(containedStyle)
      : setStyle(outlinedStyle);
  }, [variant]);

  return (
    <Link className={`border px-2 py-1 ${style}`} href={href}>
      {text}
    </Link>
  );
}
