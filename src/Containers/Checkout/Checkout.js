import React, { Component } from "react";

import CheckoutSummary from "../../Components/Order/CheckoutSummary/CheckoutSummary";
import { Route } from "react-router-dom";
import ContactData from "../Checkout/ContactData/ContactData";

class Checkout extends Component {
  state = {
    ingredients: null,
    totalPrice: 0
  };
  componentWillMount() {
    const query = new URLSearchParams(this.props.location.search);
    console.log(query.entries());
    const ingredients = {};
    let price = 0;
    for (let param of query.entries()) {
      //['salad', "1"]
      if (param[0] === "price") {
        price = param[1];
      } else {
        ingredients[param[0]] = +param[1];
      }
    }

    this.setState({
      ingredients: ingredients,
      totalPrice: price
    });
  }

  cancelOrderHandler = () => {
    this.props.history.goBack();
  };
  continueOrderHandler = () => {
    this.props.history.push("/checkout/contact-data");
  };
  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.state.ingredients}
          cancel={this.cancelOrderHandler}
          continue={this.continueOrderHandler}
        />
        <Route
          path={this.props.match.path + "/contact-data"}
          render={props => {
            return (
              <ContactData
                ingredients={this.state.ingredients}
                totalPrice={this.state.totalPrice}
                {...props}
              />
            );
          }}
        />
      </div>
    );
  }
}

export default Checkout;
