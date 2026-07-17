import type { Metadata } from "next";
import Experience from "@/views/Experience";

export const metadata: Metadata = {
    title: "Experience",
    description: "Professional roles, internships and hands-on projects that shaped how Sander Constantin builds software.",
};

export default function Page() {
    return <Experience />;
}
