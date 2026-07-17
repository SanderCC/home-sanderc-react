import type { Metadata } from "next";
import Skills from "@/views/Skills";

export const metadata: Metadata = {
    title: "Skills",
    description: "The languages, frameworks and tools Sander Constantin uses to build things.",
};

export default function Page() {
    return <Skills />;
}
