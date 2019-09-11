import React, { Component } from "react";
import Aux from "../../hoc/Aux/Aux";
import Burger from "../../Components/Burger/Burger";
import BuildControls from "../../Components/Burger/BuildControls/BuildControls";
import Model from "../../Components/UI/Modal/Modal";
import OrderSummary from "../../Components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-order.js";
import Spinner from "../../Components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/WithErrorHandler/withErrorHandler";

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.7,
  meat: 2,
  bacon: 0.5
};

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    purchasing: false,
    loading: false,
    error: false
  };
  async componentDidMount() {
    try {
      const response = await axios.get(
        "https://my-burger-react-76a9f.firebaseio.com/ingredients.json"
      );
      const ingredients = response.data;

      this.setState({
        ingredients: ingredients
      });
    } catch (err) {
      this.setState({
        error: true
      });
    }
  }

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
    const queryParams = [];
    for (let i in this.state.ingredients) {
      queryParams.push(
        encodeURIComponent(i) +
          "=" +
          encodeURIComponent(this.state.ingredients[i])
      );
    }
    queryParams.push("price=" + this.state.totalPrice);
    const queryString = queryParams.join("&");
    this.props.history.push({
      pathname: "/checkout",
      search: "?" + queryString
    });
  };

  render() {
    const disabledInfo = {
      ...this.state.ingredients
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummery = null;

    let burger = this.state.error ? (
      <p>Ingredients can not be loading!!!</p>
    ) : (
      <Spinner />
    );

    if (this.state.ingredients) {
      burger = (
        <Aux>
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
      orderSummery = (
        <OrderSummary
          ingredients={this.state.ingredients}
          canceled={this.cancelPurchaseHandler}
          continue={this.continuePurchaseHandler}
        />
      );
    }
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

        {burger}
      </Aux>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);
