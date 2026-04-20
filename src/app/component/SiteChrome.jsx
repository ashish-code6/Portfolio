"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar/Navbar";
import CustomCursor from "./CustomCursor";
import ImportJs from "./ImportJs";

export default function SiteChrome({ children }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin");

  return (
    <>
      {!isAdminRoute ? (
        <>
          <Navbar />
          <CustomCursor />
        </>
      ) : null}
      <ImportJs />
      {children}
    </>
  );
}
