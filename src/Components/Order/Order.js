import React from "react";

import classes from "./Order.module.css";

const order = props => {
  const ingredients = [];

  const IngredientsKeys = Object.keys(props.ingredients);
  const countIngredients = Object.values(props.ingredients);
  IngredientsKeys.map((ingredient, index) => {
    ingredients.push(`${ingredient}: (${countIngredients[index]})\n`);
  });

  return (
    <div className={classes.Order}>
      <p>
        Ingredients :
        {ingredients.map(ig => {
          return (
            <span
              key={Math.random()}
              style={{
                textTransform: "capitalize",
                display: "inline-block",
                margin: "0 8px",
                border: "1px solid #ccc",
                padding: "5px"
              }}
            >
              {ig}
            </span>
          );
        })}
      </p>
      <p>
        Price: USD{" "}
        <strong>{Number.parseFloat(props.totalPrice).toFixed(2)}</strong>
      </p>
    </div>
  );
};

export default order;
