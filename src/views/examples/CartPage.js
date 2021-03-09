import React from "react";
import { useHistory } from "react-router";

// reactstrap components
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  Table,
  Container,
  Row,
  Col,
} from "reactstrap";

import PaypalButton from "components/PaypalButton";
import ScrollTransparentNavbar from "components/Navbars/ScrollTransparentNavbar.js";

// core components

function CartPage() {
  const [cart, setCart] = React.useState([]);
  const [cartTotal, setCartTotal] = React.useState(0);
  const history = useHistory();

  React.useEffect(() => {
    const cartInLocalStorage = JSON.parse(localStorage.getItem("cart")) || [];
    if (cartInLocalStorage && cartInLocalStorage.length) {
      setCart(cartInLocalStorage);
    } else {
      localStorage.setItem("cart", JSON.stringify([]));
      setCart(cartInLocalStorage);
      alert("Your Cart is empty! Please fill it with some items!");
      history.push("/shop");
    }
    setCartTotal(
      cartInLocalStorage
        .map((item) => {
          if (item.id === "tee-time") {
            return (
              item.meta.filter((player) => player.prepaid).length * item.price
            );
          }
          return item.price;
        })
        .reduce((sum, item) => sum + item, 0)
    );
  }, []);

  const handleRemoveItem = (id) => {
    console.log("Trying to delete: ", id);
    const newCart = cart.filter((item) => item.id !== id);
    localStorage.setItem("cart", JSON.stringify(newCart));
    setCart(newCart);

    if (newCart.length === 0) {
      history.push("/shop");
    }
  };

  return (
    <>
      <ScrollTransparentNavbar />
      <div className="section" style={{ backgroundColor: "antiquewhite" }}>
        <Container>
          <div className="space-"></div>
          <div className="cd-section" id="cartPage">
            <h3 className="title">Shopping Cart</h3>
            <div id="tables">
              <div className="title"></div>
              {cart.length ? (
                <Row>
                  <Col md="12">
                    <h4>
                      <small>Shopping Cart Table</small>
                    </h4>
                  </Col>
                  <Col md="12">
                    <Card className="card-plain">
                      <CardBody>
                        <Table className="table-shopping" responsive>
                          <thead>
                            <tr>
                              <th className="text-center"> Product Image</th>
                              <th>Product Detail</th>
                              <th className="text-right">Unit(s)</th>
                              <th className="text-right">Price</th>
                            </tr>
                          </thead>
                          <tbody>
                            {cart.map(
                              ({
                                image,
                                title,
                                description,
                                price,
                                id,
                                path,
                                meta,
                              }) => (
                                <tr>
                                  <td style={{ width: "20%" }}>
                                    <div className="img-container">
                                      <img alt={title} src={image}></img>
                                    </div>
                                  </td>
                                  <td
                                    className="td-name"
                                    style={{ width: "50%" }}
                                  >
                                    <a
                                      href="#pablo"
                                      onClick={(e) => e.preventDefault()}
                                    >
                                      {title}
                                    </a>
                                    <br></br>
                                    <small>
                                      {meta.map((m) => {
                                        return (
                                          <p>
                                            {m.name} &nbsp;
                                            {m.email} &nbsp;
                                            {m.phone}
                                          </p>
                                        );
                                      })}
                                    </small>
                                  </td>
                                  <td>
                                    {id === "tee-time"
                                      ? meta.filter((player) => player.prepaid)
                                          .length
                                      : 1}
                                  </td>
                                  {/* <td>Black</td>
                                <td>M</td> */}
                                  <td
                                    className="td-number"
                                    style={{ width: "30%" }}
                                  >
                                    <small>$</small>
                                    {id === "tee-time"
                                      ? meta.filter((player) => player.prepaid)
                                          .length * price
                                      : price}
                                  </td>
                                  <td className="td-actions">
                                    <Button
                                      color="neutral"
                                      data-placement="left"
                                      id="tooltip109218971"
                                      type="button"
                                      onClick={() => handleRemoveItem(id)}
                                    >
                                      <i className="now-ui-icons ui-1_simple-remove"></i>
                                    </Button>
                                  </td>
                                </tr>
                              )
                            )}

                            <tr>
                              <td className="td-total"></td>
                              <td className="td-price">
                                Total <small>$</small>
                                {cartTotal}
                              </td>
                              <td className="text-right" colSpan="3">
                                <PaypalButton
                                  cartTotal={cartTotal}
                                  cart={cart}
                                  history={history}
                                />
                              </td>
                            </tr>
                          </tbody>
                        </Table>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              ) : (
                <h4> There is not item in cart.</h4>
              )}
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}

export default CartPage;
