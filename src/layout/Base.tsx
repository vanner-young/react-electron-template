import { ReactNode } from "react";
import Header from "@/layout/Header";
import Footer from "@/layout/Footer";
import { isClientEnv } from "@/common/index";

export default function BaseLayout(props: { children: ReactNode }) {
    const openElectron = isClientEnv();
    return (
        <section className="relative bg-bg h-full">
            {(openElectron && <Header />) || ""}
            {props.children}
            <Footer />
        </section>
    );
}
