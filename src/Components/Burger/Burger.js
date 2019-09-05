import React from "react";
import classes from "./Burger.module.css";
import BurgerIngredint from "./BurgerIngredint/BurgerIngredint";

const burger = props => {
  const transformIngredients = Object.keys(props.ingredients);
  const valueOfObjectIngredients = Object.values(props.ingredients);

  const burgerFilling = [];

  transformIngredients.map((x, index) => {
    for (let i = 0; i < valueOfObjectIngredients[index]; i++) {
      burgerFilling.push(
        <BurgerIngredint type={x} key={index + Math.random()} />
      );
    }
  });

  return (
    <div className={classes.Burger}>
      <BurgerIngredint type="bread-top" />
      {burgerFilling.length === 0 ? (
        <p>Please start adding ingredients!</p>
      ) : (
        [...burgerFilling]
      )}
      <BurgerIngredint type="bread-button" />
    </div>
  );
};

export default burger;
