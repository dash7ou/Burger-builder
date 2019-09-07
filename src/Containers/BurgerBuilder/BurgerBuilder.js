import React, { Component } from "react";
import Aux from "../../hoc/Aux/Aux";
import Burger from "../../Components/Burger/Burger";
import BuildControls from "../../Components/Burger/BuildControls/BuildControls";
import Model from "../../Components/UI/Modal/Modal";
import OrderSummary from "../../Components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-order.js";
import Spinner from "../../Components/UI/Spinner/Spinner";

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
    purchasing: false,
    loading: false
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

  continuePurchaseHandler = async () => {
    // alert("you continue");
    this.setState({
      loading: true
    });
    const order = {
      ingredients: this.state.ingredients,
      totalPrice: this.state.totalPrice,
      customer: {
        name: "Dash zou",
        address: {
          street: "test street 1712",
          zipCode: "97000",
          country: "palestine"
        },
        email: "test@test.com"
      },
      deliveryMethods: "fastest"
    };
    try {
      const response = await axios.post("/orders.json", order);
      console.log(response);
      this.setState({
        loading: false,
        purchasing: false
      });
    } catch (error) {
      this.setState({
        loading: false,
        purchasing: false
      });
      console.log(error);
    }
  };

  render() {
    const disabledInfo = {
      ...this.state.ingredients
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummery = (
      <OrderSummary
        ingredients={this.state.ingredients}
        canceled={this.cancelPurchaseHandler}
        continue={this.continuePurchaseHandler}
      />
    );
    if (this.state.loading) {
      orderSummery = <Spinner />;
    }
    return (
      <Aux>
        <Model
          show={this.state.purchasing}
          modalClosed={this.cancelPurchaseHandler}
        >
          {orderSummery}
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
