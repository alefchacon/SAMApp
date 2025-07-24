import React from "react";

import Card from "./Card.js";
import Footer from "./Footer.js";
import Header from "./Header.js";

interface IPageProps {
  children: React.ReactNode;
  title: string | React.ReactNode;
  subtitle: string | React.ReactNode;
  disableShadow?: boolean;
}
export default function Page({
  children,
  title,
  subtitle,
  disableShadow,
}: IPageProps) {
  return (
    <div className="flex-col flex-grow-1">
      <Header title={title} subtitle={subtitle}></Header>
      <div className="flex flex-col page-padding flex-grow-1">
        <br />
        <br />
        {disableShadow ? (
          <div className={"flex-col gap-2rem p-2rem"}>{children}</div>
        ) : (
          <Card className={"flex-col gap-2rem p-2rem"}>{children}</Card>
        )}
      </div>
      <br />
      <br />
      <Footer></Footer>
    </div>
  );
}
