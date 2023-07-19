const Header = () => {
  return (
    <header className="mb-16 md:mt-16 md:max-w-2xl md:mx-auto">
      <div className="bg-stone-800 shadow-xl ring-1 ring-stone-500 md:rounded-2xl">
        <div className="max-w-2xl mx-auto p-4">
          <div className="flex flex-col md:flex-row items-start gap-6">
            <img
              src="/assets/profile_pic.jpg"
              className="w-24 aspect-square rounded-xl"
              alt="Rustem Kakimov profile picture"
            />
            <div>
              <Paragraph>Greetings! 👋</Paragraph>
              <Paragraph>
                I'm Rustem Kakimov, a software developer building interactive
                experiences.
              </Paragraph>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

const Paragraph = ({ children }: { children: string }) => {
  return (
    <p className="text-base sm:text-xl text-stone-50 font-medium sm:mb-2 last-of-type:mb-0">
      {children}
    </p>
  );
};

export default Header;
