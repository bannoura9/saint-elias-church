import React from "react";

// reactstrap components
import {
  Row,
  Col,
  Carousel,
  CarouselItem,
  CarouselIndicators,
} from "reactstrap";

// core components
const items = [
  {
    src: "url(" + require("assets/img/golf/golf-funny.jpeg") + ")",
    content: (
      <Row>
        <Col className="ml-auto mr-auto" md="8">
          <h1 className="title">If it's a good cause,</h1>
          <h4 className="description text-white">
            I'll play just about anything.
          </h4>
        </Col>
      </Row>
    ),
    altText: "",
    caption: "",
  },
  {
    src: "url(" + require("assets/img/golf/golf-funny2.jpeg") + ")",
    content: (
      <Row>
        <Col className="ml-auto mr-auto text-center" md="8">
          <h1 className="title">
            Golf is deceptively simple and endlessly complicated;
          </h1>
          <h4 className="description text-white">
            it satisfies the soul and frustrates the intellect. It is at the
            same time rewarding and maddening - and it is without a doubt the
            greatest game mankind has ever invented.
          </h4>
        </Col>
      </Row>
    ),
    altText: "",
    caption: "",
  },
  {
    src: "url(" + require("assets/img/golf/golf-funny3.jpeg") + ")",
    content: (
      <Row>
        <Col className="ml-auto mr-auto" md="8">
          <h1 className="title">
            It took me seventeen years to get three thousand hits in baseball.
          </h1>
          <h4 className="description text-white">
            I did it in one afternoon on the golf course.
          </h4>
        </Col>
      </Row>
    ),
    altText: "",
    caption: "",
  },
];

function EcommerceHeader() {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [animating, setAnimating] = React.useState(false);
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
  return (
    <>
      <Carousel activeIndex={activeIndex} next={next} previous={previous}>
        <CarouselIndicators
          items={items}
          activeIndex={activeIndex}
          onClickHandler={goToIndex}
        />
        {items.map((item) => {
          return (
            <CarouselItem
              onExiting={onExiting}
              onExited={onExited}
              key={item.src}
            >
              <div className="page-header header-filter">
                <div
                  className="page-header-image"
                  style={{
                    backgroundImage: item.src,
                  }}
                ></div>
                <div className="content-center text-center">{item.content}</div>
              </div>
            </CarouselItem>
          );
        })}
        <a
          className="left carousel-control carousel-control-prev"
          data-slide="prev"
          href="#pablo"
          onClick={(e) => {
            e.preventDefault();
            previous();
          }}
          role="button"
        >
          <span className="now-ui-icons arrows-1_minimal-left" />
          <span className="sr-only">Previous</span>
        </a>
        <a
          className="right carousel-control carousel-control-next"
          data-slide="next"
          href="#pablo"
          onClick={(e) => {
            e.preventDefault();
            next();
          }}
          role="button"
        >
          <span className="now-ui-icons arrows-1_minimal-right" />
          <span className="sr-only">Next</span>
        </a>
      </Carousel>
    </>
  );
}

export default EcommerceHeader;
