import Header from "./header";
import Meta from "./meta";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <>
      <Meta />
      <div className="min-h-screen max-w-2xl mx-auto">
        <Header />
        <main className="px-4 pb-32">{children}</main>
      </div>
    </>
  );
};

export default Layout;
