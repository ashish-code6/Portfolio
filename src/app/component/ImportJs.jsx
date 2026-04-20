"use client";
import { useEffect } from "react";
const ImportJs = () => {

    useEffect(() => {
        import("bootstrap/dist/js/bootstrap.bundle.min.js");
    }, []);

    return (
        <></>
    )
}

export default ImportJs;