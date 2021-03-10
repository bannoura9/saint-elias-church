import React from "react";
import ReactDOM from "react-dom";
import scriptLoader from "react-async-script-loader";

const CLIENT_ID =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_PAYPAL_CLIENT_ID_PROD
    : process.env.REACT_APP_PAYPAL_CLIENT_ID;

let PayPalButton = null;
class PaypalButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showButtons: false,
      loading: true,
      paid: false,
    };

    window.React = React;
    window.ReactDOM = ReactDOM;
  }

  componentDidMount() {
    const { isScriptLoaded, isScriptLoadSucceed } = this.props;

    if (isScriptLoaded && isScriptLoadSucceed) {
      PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });
      this.setState({ loading: false, showButtons: true });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { isScriptLoaded, isScriptLoadSucceed } = nextProps;

    const scriptJustLoaded =
      !this.state.showButtons && !this.props.isScriptLoaded && isScriptLoaded;

    if (scriptJustLoaded) {
      if (isScriptLoadSucceed) {
        PayPalButton = window.paypal.Buttons.driver("react", {
          React,
          ReactDOM,
        });
        this.setState({ loading: false, showButtons: true });
      }
    }
  }
  createOrder = (data, actions) => {
    let paymentDescription = "";
    for (const cart of this.props.cart) {
      for (const user of cart.meta) {
        paymentDescription += ` ${user.name} ${user.email} ${user.phone}`;
      }
    }
    return actions.order.create({
      purchase_units: [
        {
          description: paymentDescription,
          amount: {
            currency_code: "USD",
            value: this.props.cartTotal,
          },
          // items: this.props.cart.map((item) => ({
          //   name: item.title,
          //   unit_amount: item.price,
          //   tax: "",
          //   quantity:
          //     item.id === "tee-time"
          //       ? item.meta.filter((player) => player.prepaid).length
          //       : 1,
          //   description: item.description,
          //   sku: item.id,
          //   category: "",
          // })),
        },
      ],
    });
  };

  onApprove = (data, actions) => {
    actions.order.capture().then((details) => {
      const paymentData = {
        payerID: data.payerID,
        orderID: data.orderID,
      };
      console.log("Payment Approved: ", paymentData);
      this.setState({ showButtons: false, paid: true });
      localStorage.setItem("cart", "[]");
      setTimeout(() => {
        this.props.history.push("/");
      }, 2000);
    });
  };

  render() {
    console.log("cidddd==>>>", CLIENT_ID);
    const { showButtons, loading, paid } = this.state;

    return (
      <div className="main">
        {loading && <h1>Loading...</h1>}

        {showButtons && (
          <PayPalButton
            createOrder={(data, actions) => this.createOrder(data, actions)}
            onApprove={(data, actions) => this.onApprove(data, actions)}
          />
        )}

        {paid && (
          <div className="main">
            {/* <img alt="Mercedes G-Wagon" src={Car} /> */}
            <h2>Thank you for your purchase</h2>
          </div>
        )}
      </div>
    );
  }
}

export default scriptLoader(
  `https://www.paypal.com/sdk/js?client-id=${CLIENT_ID}`
)(PaypalButton);
