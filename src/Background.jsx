export const Background = ({ children }) => {
  return (
    <div className="relative w-full h-full min-h-screen overflow-hidden">
      <img
        src="/Test_0094.png"
        alt="colourful background"
        className="fixed top-0 left-0 w-full h-full object-cover -z-10"
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
};
