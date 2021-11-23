import React from "react";

const Navbar = (props) => {
  const clickHandler = () => {
    if (props.displayedContainer === "player") {
      props.setDisplayedContainer("homepage");
    } else {
      props.setDisplayedContainer("player");
    }
  };

  return (
    <nav>
      {/* <h2>Navbar</h2> */}
      <button onClick={clickHandler}>
        <h2>{props.displayedContainer === "player" ? "Home" : "Player"}</h2>
      </button>
    </nav>
  );
};

export default Navbar;
