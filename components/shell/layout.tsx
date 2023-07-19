import Header from "./header";
import Meta from "./meta";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <>
      <Meta />
      <Header />
      <main className="min-h-screen max-w-2xl mx-auto px-4 pb-32">
        {children}
      </main>
    </>
  );
};

export default Layout;
