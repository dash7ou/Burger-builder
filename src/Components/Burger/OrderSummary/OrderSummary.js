import React from "react";
import Aux from "../../../hoc/Aux";
import Button from "../../UI/Button/Button";

const orderSummary = props => {
  const ingredientSummary = Object.keys(props.ingredients);
  const ingredientSummaryValues = Object.values(props.ingredients);

  return (
    <Aux>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredients: </p>
      <ul>
        {ingredientSummary.map((is, index) => {
          return (
            <li key={Math.random()}>
              <span style={{ textTransform: "capitalize" }}>{is}</span>:
              {ingredientSummaryValues[index]}
            </li>
          );
        })}
      </ul>
      <p>Continue To Checkout?</p>
      <Button btnType="Danger" clicked={props.canceled}>
        CANCEL
      </Button>
      <Button btnType="Success" clicked={props.continue}>
        CONTINUE
      </Button>
    </Aux>
  );
};

export default orderSummary;
