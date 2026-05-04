"use client";

import { Navbar } from "@/components/navbar";
import { Writings } from "@/components/sections";
import { ChatBar } from "@/components/chat-bar";
import * as React from "react";
import { defaultPortfolioContent } from "@/lib/portfolio-content";
import { fetchPortfolioContent } from "@/lib/portfolio-cms";

export default function WritingsPage() {
  const [portfolioData, setPortfolioData] = React.useState(defaultPortfolioContent);

  React.useEffect(() => {
    let cancelled = false;
    fetchPortfolioContent().then((content) => {
      if (!cancelled) setPortfolioData(content);
    });
    return () => { cancelled = true; };
  }, []);

  return (
    <main className="min-h-screen relative z-0 flex flex-col">
      <Navbar />
      <div className="pt-24 flex-grow">
        <Writings writings={portfolioData.writings} />
      </div>
      <ChatBar portfolioData={portfolioData} />
    </main>
  );
}
