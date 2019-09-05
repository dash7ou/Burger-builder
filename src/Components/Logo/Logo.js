import React from "react";

import BurgerLogo from "../../assets/images/27.1 burger-logo.png.png";

import classes from "./Logo.module.css";

const logo = props => {
  return (
    <div className={classes.Logo}>
      <img src={BurgerLogo} alt="My Burger" />
    </div>
  );
};

export default logo;
