import Meta from "./meta";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <>
      <Meta />
      <main className="min-h-screen max-w-2xl mx-auto py-24 px-4">
        {children}
      </main>
    </>
  );
};

export default Layout;
