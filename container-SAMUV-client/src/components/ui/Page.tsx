import React from "react";

// import Card from "./Card.js";
import Footer from "./Footer.js";
import Header from "./Header.js";

interface IPageProps {
  children: React.ReactNode;
  title: string | React.ReactNode;
  subtitle?: string | React.ReactNode;
  disableShadow?: boolean;
}
export default function Page({
  children,
  title,
  subtitle,
  disableShadow,
}: IPageProps) {
  return (
    <div className="flex flex-col w-100">
      <Header title={title} subtitle={subtitle}></Header>
      <div className="flex flex-col page-padding h-100 p-2">
        <div className={"flex-col gap-2rem"}>{children}</div>
      </div>

      <Footer></Footer>
    </div>
  );
}
