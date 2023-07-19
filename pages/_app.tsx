import { AppProps } from "next/app";
import "../styles/index.css";
import Layout from "../components/shell/layout";
import { Exo_2 } from "next/font/google";

const nextFont = Exo_2({ subsets: ["latin"] });

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className={nextFont.className}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </div>
  );
}
