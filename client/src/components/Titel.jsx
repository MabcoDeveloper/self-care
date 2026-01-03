import React from "react";

function Titel({
  titel1,
  titel2,
  titelStyles,
  titel1Styles,
  paraStyles,
  para,
}) {
  return (
    <div className={titelStyles}>
      <h3 className={`${titel1Styles} h3 capitalize`}>
        {titel1}
        <span className="font-light text-secondary">{titel2}</span>
      </h3>
      <div className="w-24 h-[3px] rounded-full bg-gradient-to-r from-secondary to-[#DDD9FF]" />

      <p className={`${paraStyles} max-w-lg mt-2`}>
        {para
          ? para
          : "Discover costmetics that enhance beauty, deliver radiance and bring \nconfidence to your daily routin"}
      </p>
    </div>
  );
}

export default Titel;
