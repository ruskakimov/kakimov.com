const About = () => {
  return (
    <div className="p-4 bg-stone-800 rounded-md shadow-xl">
      <div className="flex flex-row items-center gap-x-6">
        <img
          src="/assets/profile_pic.jpg"
          className="w-24 aspect-square rounded"
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
    <p className="text-xl text-stone-50 font-medium mb-2 last-of-type:mb-0">
      {children}
    </p>
  );
};

export default About;
