import React, { Component } from "react";
import Aux from "../../../hoc/Aux/Aux";
import Button from "../../UI/Button/Button";

class OrderSummary extends Component {
  //This could be a functional component , does not have to be a class
  componentDidUpdate() {
    console.log("[Order Summary] willUpdate");
  }
  render() {
    const ingredientSummary = Object.keys(this.props.ingredients);
    const ingredientSummaryValues = Object.values(this.props.ingredients);

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
        <Button btnType="Danger" clicked={this.props.canceled}>
          CANCEL
        </Button>
        <Button btnType="Success" clicked={this.props.continue}>
          CONTINUE
        </Button>
      </Aux>
    );
  }
}

export default OrderSummary;
