import type { Metadata } from "next";
import Home from "@/views/Home";

export const metadata: Metadata = {
    title: "Sander Constantin — Software Engineer",
};

export default function Page() {
    return <Home />;
}
