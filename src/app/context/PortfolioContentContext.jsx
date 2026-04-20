"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { defaultPortfolioContent } from "../data/portfolioContent";

const PortfolioContentContext = createContext(null);

export function PortfolioContentProvider({ children }) {
  const [content, setContent] = useState(defaultPortfolioContent);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const loadContent = async () => {
      try {
        const response = await fetch("/api/portfolio-content", {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Failed to load portfolio content.");
        }

        const data = await response.json();

        if (isMounted) {
          setContent(data);
        }
      } catch (error) {
        console.error("Unable to load portfolio content from API.", error);
      } finally {
        if (isMounted) {
          setIsLoaded(true);
        }
      }
    };

    loadContent();

    return () => {
      isMounted = false;
    };
  }, []);

  const value = useMemo(
    () => ({
      content,
      setContent,
      isLoaded,
      defaultContent: defaultPortfolioContent,
    }),
    [content, isLoaded]
  );

  return (
    <PortfolioContentContext.Provider value={value}>
      {children}
    </PortfolioContentContext.Provider>
  );
}

export function usePortfolioContent() {
  const context = useContext(PortfolioContentContext);

  if (!context) {
    throw new Error("usePortfolioContent must be used within PortfolioContentProvider");
  }

  return context;
}
