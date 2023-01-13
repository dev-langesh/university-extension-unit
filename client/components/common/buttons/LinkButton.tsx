import Link from "next/link";
import React, { useEffect, useState } from "react";

type LinkButtonType = {
  href: string;
  text: string;
  variant: "contained" | "outlined";
  color?: string;
  size?: "small" | "medium" | "large";
};

export default function LinkButton({
  href,
  text,
  variant,
  color,
  size,
}: LinkButtonType) {
  const [style, setStyle] = useState<string>();

  const outlinedStyle = "border-white text-white";
  const containedStyle = "border-transparent bg-white text-indigo-600";
  const smallSize = "px-2 py-1";
  const largeSize = "p-2 ";

  useEffect(() => {
    variant === "contained"
      ? setStyle(containedStyle)
      : setStyle(outlinedStyle);

    if (color) {
      const coloured = `bg-indigo-600 border-indigo-600 text-white hover:bg-white hover:text-indigo-600`;

      setStyle(coloured);
    }

    if (size === "large") {
      setStyle((prev) => `${prev} ${largeSize}`);
    } else {
      setStyle((prev) => `${prev} ${smallSize}`);
    }
  }, [variant, size]);

  return (
    <Link className={`border ${style} transition-all duration-200`} href={href}>
      {text}
    </Link>
  );
}
