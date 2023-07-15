const About = () => {
  return (
    <div className="p-4 bg-stone-800 -mx-4 sm:rounded-2xl shadow-xl ring-1 ring-stone-500">
      <div className="flex flex-col sm:flex-row items-start gap-6">
        <img
          src="/assets/profile_pic.jpg"
          className="w-24 aspect-square rounded-xl ring-1 ring-stone-500 shadow-md shadow-black"
          alt="Rustem Kakimov profile picture"
        />
        <div>
          <Paragraph>Greetings! 👋</Paragraph>
          <Paragraph>
            I'm Rustem Kakimov, a software engineer building interactive
            experiences.
          </Paragraph>
        </div>
      </div>
    </div>
  );
};

const Paragraph = ({ children }: { children: string }) => {
  return (
    <p className="text-base sm:text-xl text-stone-50 font-medium sm:mb-2 last-of-type:mb-0">
      {children}
    </p>
  );
};

export default About;
