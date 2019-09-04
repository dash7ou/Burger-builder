import React from "react";
import classes from "./BurgerIngredint.module.css";

const burgerIngredint = props => {
  let ingredint = null;

  switch (props.type) {
    case "bread-button":
      ingredint = <div className={classes.BreadBottom}></div>;
      break;
    case "bread-top":
      ingredint = (
        <div className={classes.BreadTop}>
          <div className={classes.Seeds1}></div>
          <div className={classes.Seeds2}></div>
        </div>
      );
      break;
    case "meat":
      ingredint = <div className={classes.Meat}></div>;
      break;
    case "cheese":
      ingredint = <div className={classes.Cheese}></div>;
      break;
    case "bacon":
      ingredint = <div className={classes.Bacon}></div>;
      break;
    case "salad":
      ingredint = <div className={classes.Salad}></div>;
      break;
    default:
      ingredint = null;
  }
  return ingredint;
};

export default burgerIngredint;
