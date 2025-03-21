import React from "react";

export function Card({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}): JSX.Element {
  return (
    <div
      className=" bg-[#111111] border-purple-400  rounded-2xl  shadow-lg shadow-purple-300 p-4"
    >
      <h1 className="text-xl text-white border-b pb-2">
        {title}
      </h1>
      <p className="text-white">{children}</p>
    </div>
  );
}