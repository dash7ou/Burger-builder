import React, { Component } from "react";
import Button from "../../../Components/UI/Button/Button";
import classes from "./ContactData.module.css";
import axios from "../../../axios-order";
import Spinner from "../../../Components/UI/Spinner/Spinner";
import Input from "../../../Components/UI/Input/Input";

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "name",
          placeholder: "Enter Your Name"
        },
        value: "",
        validation: {
          required: true,
          minLength: 5
        },
        valid: false
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "name",
          placeholder: "Enter Your Street"
        },
        value: "",
        validation: {
          required: true,
          minLength: 5
        },
        valid: false
      },
      zipCode: {
        elementType: "input",
        elementConfig: {
          type: "name",
          placeholder: "ZIP Code"
        },
        value: "",
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5
        },
        valid: false
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "name",
          placeholder: "Enter Your Country",
          minLength: 3
        },
        value: "",
        validation: {
          required: true
        },
        valid: false
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Enter Your Email"
        },
        value: "",
        validation: {
          required: true,
          minLength: 5
        },
        valid: false
      },
      deliveryMethods: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayValue: "Fastest" },
            { value: "cheapest", displayValue: "cheapest" }
          ]
        },
        value: "fastest"
      }
    },
    loading: false
  };

  orderHandler = async event => {
    event.preventDefault();
    console.log("clicked");

    this.setState({
      loading: true
    });
    const formData = {};
    for (let formElementIdentifier in this.state.orderForm) {
      formData[formElementIdentifier] = this.state.orderForm[
        formElementIdentifier
      ].value;
    }
    const order = {
      ingredients: this.props.ingredients,
      totalPrice: this.props.totalPrice,
      orderData: formData
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

  checkValidation = (value, rules) => {
    let isValid = true;
    if (rules) {
      if (rules.required) {
        isValid = value.trim() !== "" && isValid;
      }
      if (rules.minLength) {
        isValid = value.length >= rules.minLength && isValid;
      }
      if (rules.maxLength) {
        isValid = value.length <= rules.maxLength && isValid;
      }
      return isValid;
    }
  };

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedOrderForm = { ...this.state.orderForm };
    const updatedFormElement = { ...updatedOrderForm[inputIdentifier] };
    console.log(updatedFormElement);
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkValidation(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    console.log(updatedFormElement);
    updatedOrderForm[inputIdentifier] = updatedFormElement;
    this.setState({
      orderForm: updatedOrderForm
    });
  };

  render() {
    let form = <Spinner />;
    const fromElementArray = [];
    for (let key in this.state.orderForm) {
      fromElementArray.push({
        id: key,
        config: this.state.orderForm[key]
      });
    }
    if (!this.state.loading) {
      form = (
        <from>
          {fromElementArray.map(fromElement => (
            <Input
              key={fromElement.id}
              elementType={fromElement.config.elementType}
              elementConfig={fromElement.config.elementConfig}
              invalid={!fromElement.config.valid}
              value={fromElement.config.value}
              shouldValidate={
                fromElement.config.value.length !== 0 &&
                fromElement.config.validation
                  ? true
                  : false
              }
              changed={event => this.inputChangedHandler(event, fromElement.id)}
            />
          ))}
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
