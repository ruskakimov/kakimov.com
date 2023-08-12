const Header = () => {
  return (
    <header className="px-4 py-16">
      <div className="flex flex-row items-center gap-4">
        <img
          src="/assets/profile_pic.jpg"
          className="w-16 aspect-square rounded-full"
          alt="Rustem Kakimov profile picture"
        />
        <div className="flex flex-col gap-0">
          <span className="text-lg font-semibold">Blog by Rustem Kakimov.</span>
          <span className="leading-snug">
            A software developer building interactive experiences.
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
