import React, { useState, useEffect } from "react";
// react plugin used to create DropdownMenu for selecting items
import Select from "react-select";

import { useParams } from "react-router";

import "./ProductPage.css";
import itemsOnSale from "../../assets/data/itemsForSale";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  // CardFooter,
  // CardLink,
  // CardTitle,
  Collapse,
  Container,
  FormGroup,
  Label,
  Row,
  Col,
  Input,
  // UncontrolledTooltip,
  Carousel,
  CarouselItem,
  CarouselIndicators,
} from "reactstrap";

// core components
import ScrollTransparentNavbar from "components/Navbars/ScrollTransparentNavbar.js";
import ProductPageHeader from "components/Headers/ProductPageHeader.js";
import FooterSocial from "components/Footers/FooterSocial.js";

const items = [
  {
    src: require("assets/img/golf/golf-one.jpg"),
    altText: "",
    caption: "",
  },
  {
    src: require("assets/img/golf/golf-two.jpg"),
    altText: "",
    caption: "",
  },
  {
    src: require("assets/img/golf/golf-three.jpg"),
    altText: "",
    caption: "",
  },
  // {
  //   src: require("assets/img/pp-4.jpg"),
  //   altText: "",
  //   caption: "",
  // },
];

function ProductPage() {
  const onExiting = () => {
    setAnimating(true);
  };
  const onExited = () => {
    setAnimating(false);
  };
  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };
  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };
  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  };

  // carousel states and functions
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  // collapse states and functions
  const [collapses, setCollapses] = useState([1]);
  const changeCollapse = (collapse) => {
    if (collapses.includes(collapse)) {
      setCollapses(collapses.filter((prop) => prop !== collapse));
    } else {
      setCollapses([...collapses, collapse]);
    }
  };

  const { id } = useParams();

  const selectedItem = itemsOnSale.find((item) => item.id === id);
  const itemsInCart = JSON.parse(localStorage.getItem("cart"));
  let itemAlreadyInCartToSet = false;
  if (itemsInCart) {
    itemAlreadyInCartToSet = itemsInCart.find(
      (item) => item.id === selectedItem.id
    );
  }

  // select states and functions
  const [numberOfPlayers, setNumberOfPlayers] = useState(0);
  const [players, setPlayers] = useState(
    itemAlreadyInCartToSet && itemAlreadyInCartToSet.meta
      ? itemAlreadyInCartToSet.meta
      : []
  );
  const [disableAddToCart, setDisableAddToCart] = useState(true);
  const [itemAlreadyInCart, setItemAlreadyInCart] = useState(
    itemAlreadyInCartToSet
  );

  useEffect(() => {
    document.body.classList.add("product-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    return function cleanup() {
      document.body.classList.remove("product-page");
      document.body.classList.remove("sidebar-collapse");
    };
  }, []);

  useEffect(() => {
    if (players.length) {
      const playersWithIncompleteDetails = players.filter(
        ({ name, email, phone }) => !name || !email || !phone
      );
      const playersWithPrepaidOptions = players.filter(
        ({ prepaid }) => prepaid
      );
      const shouldDisable =
        playersWithIncompleteDetails.length > 0 ||
        playersWithPrepaidOptions.length <= 0;
      console.log("** ShouldDisalbe: ".shouldDisable);
      setDisableAddToCart(shouldDisable);
    } else {
      setDisableAddToCart(true);
    }
  }, [players, numberOfPlayers]);

  /* useEffect(() => {
    const itemsInCart = JSON.parse(localStorage.getItem("cart"));
    let itemAlreadyInCartToSet = false;
    if (itemsInCart) {
      itemAlreadyInCartToSet = itemsInCart.find(
        (item) => item.id === selectedItem.id
      );
    }
    if (itemAlreadyInCartToSet) {
      setItemAlreadyInCart(itemAlreadyInCartToSet);
      debugger;
      setPlayers(itemAlreadyInCartToSet.meta || []);
    }
  }, [itemAlreadyInCart, players]); */

  const handleNumberOfPlayersChange = (newNumberOfPlayers) => {
    console.log("** New Number of Players: ", newNumberOfPlayers);
    if (newNumberOfPlayers !== players.length) {
      const newPlayers = new Array(newNumberOfPlayers).fill("").map(
        (newPlayer, index) =>
          players[index] || {
            name: "",
            phone: "",
            email: "",
            prepaid: false,
          }
      );
      setPlayers(newPlayers);
      setNumberOfPlayers(newNumberOfPlayers);
      // onPlayersChange(newPlayers);
    }
  };

  const handlePlayerChange = (event, index, isCheckBox) => {
    const {
      target: { value, name, checked },
    } = event;
    console.log(value, name, checked);
    const changedPlayer = { ...players[index] };
    changedPlayer[name] = isCheckBox ? checked : value;
    const newPlayers = players.map((player, playerIndex) =>
      playerIndex === index ? changedPlayer : player
    );
    setPlayers(newPlayers);
    onPlayersChange(newPlayers);
  };

  const onPlayersChange = (newPlayers) => {
    if (newPlayers.length) {
      const playersWithIncompleteDetails = newPlayers.filter(
        ({ name, email, phone }) => !name || !email || !phone
      );
      const playersWithPrepaidOptions = newPlayers.filter(
        ({ prepaid }) => prepaid
      );
      const shouldDisable =
        playersWithIncompleteDetails.length > 0 ||
        playersWithPrepaidOptions.length <= 0;
      console.log("** ShouldDisalbe: ".shouldDisable);
      setDisableAddToCart(shouldDisable);

      if (!shouldDisable) {
        console.log("itemAlreadyInCartToSet: ", itemAlreadyInCartToSet);
        const cartAlreadyInLocalStorage = JSON.parse(
          localStorage.getItem("cart")
        );
        if (cartAlreadyInLocalStorage) {
          const indexOfCurrentItemInCart = cartAlreadyInLocalStorage.findIndex(
            (item) => item.id === id
          );

          if (indexOfCurrentItemInCart > -1) {
            cartAlreadyInLocalStorage[
              indexOfCurrentItemInCart
            ].meta = newPlayers;
            localStorage.setItem(
              "cart",
              JSON.stringify(cartAlreadyInLocalStorage)
            );
          }
        }
      }
    } else {
      setDisableAddToCart(true);
    }
  };

  const removeItemFromCart = () => {
    const itemsInCart = JSON.parse(localStorage.getItem("cart"));

    if (itemsInCart) {
      const newItemsInCart = itemsInCart.filter(
        (item) => item.id !== selectedItem.id
      );
      localStorage.setItem("cart", JSON.stringify(newItemsInCart));
      setItemAlreadyInCart(false);
    }
  };

  const addItemToCart = () => {
    const itemsInCart = JSON.parse(localStorage.getItem("cart"));
    if (itemsInCart) {
      const newItemsInCart = [
        ...itemsInCart,
        { ...selectedItem, meta: players },
      ];
      localStorage.setItem("cart", JSON.stringify(newItemsInCart));
    } else {
      const newItemsInCart = [{ ...selectedItem, meta: players }];
      localStorage.setItem("cart", JSON.stringify(newItemsInCart));
    }
    setItemAlreadyInCart(true);
  };

  return (
    <>
      <ScrollTransparentNavbar />
      <div className="wrapper">
        <ProductPageHeader />
        <div className="section">
          <Container>
            <Row>
              <Col md="5">
                <Carousel
                  activeIndex={activeIndex}
                  next={next}
                  previous={previous}
                >
                  <CarouselIndicators
                    items={selectedItem.additionalImages}
                    activeIndex={activeIndex}
                    onClickHandler={goToIndex}
                  />
                  {selectedItem.additionalImages.map((item) => {
                    return (
                      <CarouselItem
                        onExiting={onExiting}
                        onExited={onExited}
                        key={item}
                      >
                        <img
                          src={item}
                          alt={item}
                          className="d-block img-raised"
                        />
                      </CarouselItem>
                    );
                  })}
                  <a
                    className="carousel-control-prev"
                    data-slide="prev"
                    href="#pablo"
                    onClick={(e) => {
                      e.preventDefault();
                      previous();
                    }}
                    role="button"
                  >
                    <Button
                      className="btn-icon btn-round"
                      color="info"
                      name="button"
                      size="sm"
                      type="button"
                    >
                      <i className="now-ui-icons arrows-1_minimal-left"></i>
                    </Button>
                  </a>
                  <a
                    className="carousel-control-next"
                    data-slide="next"
                    href="#pablo"
                    onClick={(e) => {
                      e.preventDefault();
                      next();
                    }}
                    role="button"
                  >
                    <Button
                      className="btn-icon btn-round"
                      color="info"
                      name="button"
                      size="sm"
                      type="button"
                    >
                      <i className="now-ui-icons arrows-1_minimal-right"></i>
                    </Button>
                  </a>
                </Carousel>
                <p className="blockquote blockquote-info">
                  The Pinery Country Club <br></br>6900 N Pinery Pkwy, <br></br>
                  Parker, CO 80134 <br></br>
                  <small>Where fun will be held</small>
                </p>
              </Col>
              <Col className="ml-auto mr-auto" md="6">
                <h2 className="title">{selectedItem.title}</h2>
                <h5 className="category">
                  There is always a time for a good cause
                </h5>
                <h2 className="main-price">
                  ${" "}
                  {selectedItem.id === "tee-time"
                    ? selectedItem.price *
                        players.filter((player) => player.prepaid).length || 0
                    : selectedItem.price}
                </h2>
                <div
                  aria-multiselectable={true}
                  className="card-collapse"
                  id="accordion"
                  role="tablist"
                >
                  {selectedItem.displayAdditionalFields && (
                    <Card className="card-plain">
                      <CardHeader id="headingThree" role="tab">
                        <a
                          aria-expanded={collapses.includes(3)}
                          data-parent="#accordion"
                          data-toggle="collapse"
                          href="#pablo"
                          onClick={(e) => {
                            e.preventDefault();
                            changeCollapse(3);
                          }}
                        >
                          Players{" "}
                          <i className="now-ui-icons arrows-1_minimal-down"></i>
                        </a>
                      </CardHeader>
                      <Collapse isOpen={collapses.includes(3)}>
                        <CardBody>
                          <Row className="pick-size">
                            <Col lg="6" md="8" sm="6">
                              <label>Number of Players please write all the players in your team even you aren't paying for them</label>
                              <Select
                                className="react-select"
                                classNamePrefix="react-select"
                                name="numberOfPlayers"
                                onChange={({ value }) =>
                                  handleNumberOfPlayersChange(value)
                                }
                                options={[
                                  { value: 1, label: "1" },
                                  { value: 2, label: "2" },
                                  { value: 3, label: "3" },
                                  { value: 4, label: "4" },
                                ]}
                                placeholder="Select number of Players"
                                value={
                                  numberOfPlayers || numberOfPlayers.toString()
                                }
                              ></Select>
                            </Col>
                          </Row>

                          {players.map((player, index) => (
                            <Row className="pick-size" key={index}>
                              <Col lg="3" md="3" sm="12">
                                <label>Name</label>
                                <Input
                                  className="form-control-success"
                                  type="text"
                                  name="name"
                                  value={player.name}
                                  onChange={(e) => handlePlayerChange(e, index)}
                                ></Input>
                              </Col>

                              <Col lg="3" md="3" sm="12">
                                <label>Phone</label>
                                <Input
                                  className="form-control-success"
                                  type="tel"
                                  name="phone"
                                  value={player.phone}
                                  onChange={(e) => handlePlayerChange(e, index)}
                                ></Input>
                              </Col>

                              <Col lg="3" md="3" sm="12">
                                <label>Email</label>
                                <Input
                                  className="form-control-danger"
                                  type="email"
                                  name="email"
                                  value={player.email}
                                  onChange={(e) => handlePlayerChange(e, index)}
                                ></Input>
                              </Col>

                              {selectedItem.id === "tee-time" && (
                                <Col
                                  lg="3"
                                  md="3"
                                  sm="12"
                                  className="player-checkbox"
                                >
                                  <label>Paying for</label>
                                  <Label check>
                                    <span className="form-check-sign"></span>
                                    <Input
                                      type="checkbox"
                                      name="prepaid"
                                      checked={player.prepaid}
                                      onChange={(e) =>
                                        handlePlayerChange(e, index, true)
                                      }
                                    ></Input>
                                  </Label>
                                </Col>
                              )}
                            </Row>
                          ))}
                        </CardBody>
                      </Collapse>
                    </Card>
                  )}
                  <Card className="card-plain">
                    <CardHeader id="headingOne" role="tab">
                      <a
                        aria-expanded={collapses.includes(1)}
                        data-parent="#accordion"
                        data-toggle="collapse"
                        href="#pablo"
                        onClick={(e) => {
                          e.preventDefault();
                          changeCollapse(1);
                        }}
                      >
                        TOURNAMENT DETAILS{" "}
                        <i className="now-ui-icons arrows-1_minimal-down"></i>
                      </a>
                    </CardHeader>
                    <Collapse isOpen={collapses.includes(1)}>
                      <CardBody>
                        <p>
                          Saint Elias 14th Annual Golf Tournament <br></br>The
                          Pinery Country Club <br></br>6900 N Pinery Pkwy,{" "}
                          <br></br>
                          Parker, CO 80134 <br></br>
                          <br></br>June 7th, 2021 <br></br>REGISTRATION: 8:00 AM
                          <br></br>
                          SHOTGUN: 9:00 AM <br></br>
                          <br></br>
                          PLEASE SEND A CHECK WITH COMPLETED FORM MAKE CHECKS
                          PAYABLE TO: SAINT ELIAS CHURCH MAIL TO: SMOKING CAVE
                          CIGAR LOUNGE 5435 BOATWORKS DR. HIGHLANDS RANCH, CO
                          80126
                        </p>
                      </CardBody>
                    </Collapse>
                  </Card>
                  <Card className="card-plain">
                    <CardHeader id="headingTwo" role="tab">
                      <a
                        aria-expanded={collapses.includes(2)}
                        data-parent="#accordion"
                        data-toggle="collapse"
                        href="#pablo"
                        onClick={(e) => {
                          e.preventDefault();
                          changeCollapse(2);
                        }}
                      >
                        Message From Father George{" "}
                        <i className="now-ui-icons arrows-1_minimal-down"></i>
                      </a>
                    </CardHeader>
                    <Collapse isOpen={collapses.includes(2)}>
                      <CardBody>
                        <p>
                          "Dear supporters in Christ, on behalf of Saint Elias
                          Orthodox Church, we would like to thank you for
                          participating in our annual golf tournament. As we all
                          know, Saint Elias is a non­profit organization that
                          has have helped and supported our community, homeless
                          shel­ters, battered women's shelters, and all
                          catastrophes all around the world with our fundraising
                          activities throughout the years.” <br></br>
                          <br></br>Thank you for your support In Christ
                        </p>
                      </CardBody>
                    </Collapse>
                  </Card>
                </div>
                <Row className="justify-content-end">
                  {itemAlreadyInCart ? (
                    <Button
                      onClick={removeItemFromCart}
                      className="mr-3"
                      color="danger"
                    >
                      Remove from Cart
                      <i className="now-ui-icons shopping_cart-simple"></i>
                    </Button>
                  ) : (
                    <Button
                      onClick={addItemToCart}
                      className="mr-3"
                      color="success"
                      disable={id === "tee-time" && disableAddToCart}
                      disabled={id === "tee-time" && disableAddToCart}
                    >
                      Add to Cart  
                      <i className="now-ui-icons shopping_cart-simple"></i>
                    </Button>
                  )}
                </Row>
              </Col>
            </Row>
          </Container>
        </div>

        <FooterSocial />
      </div>
    </>
  );
}

export default ProductPage;
