import React, { Component } from "react";
import Order from "../../Components/Order/Order";
import axios from "../../axios-order";
import order from "../../Components/Order/Order";

class Orders extends Component {
  state = {
    orders: [],
    loading: true
  };
  async componentDidMount() {
    const response = await axios.get("/orders.json");
    const orders = [];

    for (let key in response.data) {
      orders.push(response.data[key]);
    }

    this.setState({
      orders: [...orders]
    });
  }
  render() {
    console.log(this.state.orders);
    const orders = [];
    this.state.orders.map(order => {
      orders.push(
        <Order
          key={Math.random()}
          ingredients={order.ingredients}
          totalPrice={order.totalPrice}
        />
      );
      return true;
    });

    return <div>{orders}</div>;
  }
}

export default Orders;
