import type { Metadata } from "next";
import Portfolio from "@/views/Portfolio";

export const metadata: Metadata = {
    title: "Portfolio",
    description: "A few personal projects Sander Constantin has built and shipped for fun.",
};

export default function Page() {
    return <Portfolio />;
}
