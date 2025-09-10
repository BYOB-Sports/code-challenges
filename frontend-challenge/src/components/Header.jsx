import React from "react";

const Header = ({ title, description }) => {
  return (
    <div className="bg-green-800 p-4">
      <h1 className="font-bold text-2xl text-white ml-2">{title}</h1>
      <p className="text-base text-white ml-2">{description}</p>
    </div>
  );
};

export default Header;
