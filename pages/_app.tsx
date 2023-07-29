import { AppProps } from "next/app";
import Layout from "../components/shell/layout";
import { Assistant } from "next/font/google";

import "../styles/index.css";
import "../styles/prism-github.css";

const nextFont = Assistant({ subsets: ["latin"] });

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className={nextFont.className}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </div>
  );
}
