import type { Metadata } from "next";
import Education from "@/views/Education";

export const metadata: Metadata = {
    title: "Education",
    description: "Where Sander Constantin studied, and the languages he speaks along the way.",
};

export default function Page() {
    return <Education />;
}
