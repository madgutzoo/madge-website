export const MainPage = () => {
  return (
    <div className="w-50 h-50 flex gap- mt-4">
      <a href="mailto:madgutzoo@gmail.com">
        <img
          src="../public/email-1-svgrepo-com.svg"
          alt="email icon, click here to email Madge"
          className="cursor-pointer"
        />
      </a>
      <a href="https://www.instagram.com/moumoumouuuuu/">
        <img
          src="../public/instagram-svgrepo-com.svg"
          alt="instagram icon, click here to go to the Instagram page"
          className="cursor-pointer"
        />
      </a>
    </div>
  );
};
