const About = () => {
  return (
    <div className="my-8 p-4 bg-stone-800 rounded-md shadow">
      {/* <img src={picture} className="w-12 h-12 rounded-full mr-4" alt={name} /> */}
      <Paragraph>Greetings! 👋</Paragraph>
      <Paragraph>
        I'm Rustem Kakimov, a software engineer building interactive
        experiences.
      </Paragraph>
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
