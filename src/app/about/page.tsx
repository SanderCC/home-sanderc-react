import type { Metadata } from "next";
import About from "@/views/About";

export const metadata: Metadata = {
    title: "About",
    description: "A bit more about who Sander Constantin is, outside of the CV bullet points.",
};

export default function Page() {
    return <About />;
}
