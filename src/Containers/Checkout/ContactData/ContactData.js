import React, { Component } from "react";
import Button from "../../../Components/UI/Button/Button";
import classes from "./ContactData.module.css";
import axios from "../../../axios-order";
import Spinner from "../../../Components/UI/Spinner/Spinner";
import { isGenericTypeAnnotation } from "@babel/types";
class ContactData extends Component {
  state = {
    name: "",
    email: "",
    address: {
      street: "",
      postalCode: ""
    },
    loading: false
  };

  orderHandler = async event => {
    event.preventDefault();

    this.setState({
      loading: true
    });
    const order = {
      ingredients: this.props.ingredients,
      totalPrice: this.props.totalPrice,
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
        loading: false
      });
      console.log(this.props);
      this.props.history.push("/");
    } catch (error) {
      this.setState({
        loading: false
      });
      console.log(error);
    }
  };

  render() {
    let form = <Spinner />;
    if (!this.state.loading) {
      form = (
        <from>
          <input
            className={classes.Input}
            type="text"
            name="name"
            placeholder="Enter Your Name"
          />
          <input
            className={classes.Input}
            type="text"
            name="email"
            placeholder="Enter Your Email"
          />
          <input
            className={classes.Input}
            type="text"
            name="street"
            placeholder="Enter Your Street"
          />
          <input
            className={classes.Input}
            type="text"
            name="postal"
            placeholder="Enter Your Postal Code"
          />
          <Button btnType="Success" clicked={this.orderHandler}>
            ORDER
          </Button>
        </from>
      );
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter Your Contact Data</h4>
        {form}
      </div>
    );
  }
}

export default ContactData;
