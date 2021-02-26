import React from "react";

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
  UncontrolledTooltip,
} from "reactstrap";

import PaypalButton from "components/PaypalButton";
import ScrollTransparentNavbar from "components/Navbars/ScrollTransparentNavbar.js";

// core components

function CartPage() {
  const [cart, setCart] = React.useState([]);
  const [cartTotal, setCartTotal] = React.useState(0);

  React.useEffect(() => {
    const cartInLocalStorage = JSON.parse(localStorage.getItem("cart")) || [];
    if (cartInLocalStorage) {
      setCart(cartInLocalStorage);
    } else {
      localStorage.setItem("cart", JSON.stringify([]));
      setCart(cartInLocalStorage);
    }
    setCartTotal(
      cartInLocalStorage
        .map((item) => item.price)
        .reduce((sum, item) => sum + item, 0)
    );
  }, []);

  return (
    <>
      <ScrollTransparentNavbar />
      <div className="section" style={{backgroundColor: "antiquewhite"}}>
        <Container>
          <div className="space-"></div>
          <div className="cd-section" id="cartPage">
            <h3 className="title">Shopping Cart</h3>
            <div id="tables">
              <div className="title">
                {/* <h3>
                  <small>Tables</small>
                </h3> */}
              </div>
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
                            {/* <th>Color</th>
                            <th>Size</th> */}
                            <th className="text-right">Price</th>
                            {/* <th className="text-right">Qty</th> */}
                            {/* <th className="text-right">Amount</th> */}
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
                                  <small>by Saint Laurent</small>
                                </td>
                                {/* <td>Black</td>
                                <td>M</td> */}
                                <td
                                  className="td-number"
                                  style={{ width: "30%" }}
                                >
                                  <small>$</small>
                                  {price}
                                </td>
                                {/* <td className="td-number">
                                  1{" "}
                                  <ButtonGroup>
                                    <Button color="info" size="sm">
                                      <i className="now-ui-icons ui-1_simple-delete"></i>
                                    </Button>
                                    <Button color="info" size="sm">
                                      <i className="now-ui-icons ui-1_simple-add"></i>
                                    </Button>
                                  </ButtonGroup>
                                </td>
                                <td className="td-number">
                                  <small>€</small>
                                  549
                                </td>
                                <td className="td-actions">
                                  <Button
                                    color="neutral"
                                    data-placement="left"
                                    id="tooltip109218971"
                                    type="button"
                                  >
                                    <i className="now-ui-icons ui-1_simple-remove"></i>
                                  </Button>
                                  <UncontrolledTooltip
                                    delay={0}
                                    placement="left"
                                    target="tooltip109218971"
                                  >
                                    Remove item
                                  </UncontrolledTooltip>
                                </td> */}
                              </tr>
                            )
                          )}

                          {/* <tr>
                            <td>
                              <div className="img-container">
                                <img
                                  alt="..."
                                  src={require("assets/img/balmain.jpg")}
                                ></img>
                              </div>
                            </td>
                            <td className="td-name">
                              <a
                                href="#pablo"
                                onClick={(e) => e.preventDefault()}
                              >
                                Jersey T-Shirt
                              </a>
                              <br></br>
                              <small>by Balmain</small>
                            </td>
                            <td>Black</td>
                            <td>M</td>
                            <td className="td-number">
                              <small>€</small>
                              499
                            </td>
                            <td className="td-number">
                              2{" "}
                              <ButtonGroup>
                                <Button color="info" size="sm">
                                  <i className="now-ui-icons ui-1_simple-delete"></i>
                                </Button>
                                <Button color="info" size="sm">
                                  <i className="now-ui-icons ui-1_simple-add"></i>
                                </Button>
                              </ButtonGroup>
                            </td>
                            <td className="td-number">
                              <small>€</small>
                              998
                            </td>
                            <td className="td-actions">
                              <Button
                                color="neutral"
                                data-placement="left"
                                id="tooltip230976474"
                                type="button"
                              >
                                <i className="now-ui-icons ui-1_simple-remove"></i>
                              </Button>
                              <UncontrolledTooltip
                                delay={0}
                                placement="left"
                                target="tooltip230976474"
                              >
                                Remove item
                              </UncontrolledTooltip>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div className="img-container">
                                <img
                                  alt="..."
                                  src={require("assets/img/prada.jpg")}
                                ></img>
                              </div>
                            </td>
                            <td className="td-name">
                              <a
                                href="#pablo"
                                onClick={(e) => e.preventDefault()}
                              >
                                Slim-Fit Swim Short
                              </a>
                              <br></br>
                              <small>by Prada</small>
                            </td>
                            <td>Red</td>
                            <td>M</td>
                            <td className="td-number">
                              <small>€</small>
                              200
                            </td>
                            <td className="td-number">
                              1{" "}
                              <ButtonGroup>
                                <Button color="info" size="sm">
                                  <i className="now-ui-icons ui-1_simple-delete"></i>
                                </Button>
                                <Button color="info" size="sm">
                                  <i className="now-ui-icons ui-1_simple-add"></i>
                                </Button>
                              </ButtonGroup>
                            </td>
                            <td className="td-number">
                              <small>€</small>
                              799
                            </td>
                            <td className="td-actions">
                              <Button
                                color="neutral"
                                data-placement="left"
                                id="tooltip11104356"
                                type="button"
                              >
                                <i className="now-ui-icons ui-1_simple-remove"></i>
                              </Button>
                              <UncontrolledTooltip
                                delay={0}
                                placement="left"
                                target="tooltip11104356"
                              >
                                Remove item
                              </UncontrolledTooltip>
                            </td>
                          </tr> */}

                          <tr>
                            <td className="td-total"></td>
                            <td className="td-price">
                              Total <small>$</small>
                              {cartTotal}
                            </td>
                            <td className="text-right" colSpan="3">
                              {/* <Button
                                className="btn-round"
                                color="info"
                                type="button"
                              >
                                Complete Purchase{" "}
                                <i className="now-ui-icons arrows-1_minimal-right"></i>
                              </Button> */}
                              <PaypalButton cartTotal={cartTotal} />
                            </td>
                          </tr>
                        </tbody>
                      </Table>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}

export default CartPage;
