import ContainerApp from "@/components/containerApp";
import "../styles/reset.scss";
import { Analytics } from "@vercel/analytics/react";
import { Lato } from "@next/font/google";
const lato = Lato({ weight: ["400", "700"], subsets: ["latin"] });

export default function App({ Component, pageProps }) {
    return (
        <>
            <ContainerApp className={lato.className}>
                <Component {...pageProps} />
            </ContainerApp>
            <Analytics />
        </>
    );
}
