import React, { Component } from "react";
import Aux from "../../hoc/Aux";
import Burger from "../../Components/Burger/Burger";
import BuildControls from "../../Components/Burger/BuildControls/BuildControls";
import Model from "../../Components/UI/Modal/Modal";
import OrderSummary from "../../Components/Burger/OrderSummary/OrderSummary";
// import orderSummary from "../../Components/Burger/OrderSummary/OrderSummary";

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.7,
  meat: 2,
  bacon: 0.5
};

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 4,
    purchasing: false
  };

  addIngredientHandler = type => {
    const oldCount = this.state.ingredients[type];
    const newCount = oldCount + 1;
    const ingredients = { ...this.state.ingredients };
    ingredients[type] = newCount;
    const price = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = price + oldPrice;

    this.setState({
      ingredients: ingredients,
      totalPrice: newPrice
    });
  };

  removeIngredientHandler = type => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) {
      return;
    }
    const newCount = oldCount - 1;
    const ingredients = { ...this.state.ingredients };
    ingredients[type] = newCount;
    const price = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - price;

    this.setState({
      ingredients: ingredients,
      totalPrice: newPrice
    });
  };

  purchaseHandler = () => {
    this.setState({
      purchasing: true
    });
  };

  cancelPurchaseHandler = () => {
    this.setState({
      purchasing: false
    });
  };

  continuePurchaseHandler = () => {
    alert("you continue");
  };

  render() {
    const disabledInfo = {
      ...this.state.ingredients
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    return (
      <Aux>
        <Model
          show={this.state.purchasing}
          modalClosed={this.cancelPurchaseHandler}
        >
          <OrderSummary
            ingredients={this.state.ingredients}
            canceled={this.cancelPurchaseHandler}
            continue={this.continuePurchaseHandler}
          />
        </Model>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          ingredientAdded={this.addIngredientHandler}
          ingredientDeleted={this.removeIngredientHandler}
          disabled={disabledInfo}
          price={this.state.totalPrice}
          ordered={this.purchaseHandler}
        />
      </Aux>
    );
  }
}

export default BurgerBuilder;
