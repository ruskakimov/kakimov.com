import { AppProps } from "next/app";
import "../styles/index.css";
import Layout from "../components/layout";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
