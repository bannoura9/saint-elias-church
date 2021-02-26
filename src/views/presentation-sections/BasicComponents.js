import React from "react";

// reactstrap components
import { Container, Row, Col } from "reactstrap";

// core components

function BasicComponents() {
  return (
    <>
      <div className="section section-basic-components">
        <Container>
          <Row>
            <Col className="ml-auto mr-auto" lg="5" md="7">
              <h2 className="title">We Believe</h2>
              <h6 className="category">The core element of our Church</h6>
              <h5 className="description">
                We believe in one God, the Father Almighty, Maker of heaven and
                earth, and of all things visible and invisible; And in one Lord,
                Jesus Christ, the Son of God, the Only-begotten, Begotten of the
                Father before all ages, Light of Light, True God of True God,
                Begotten, not made, of one essence with the Father, by Whom all
                things were made: Who for us men and for our salvation came down
                from heaven, and was incarnate of the Holy Spirit and the Virgin
                Mary, and was made man; And was crucified also for us under
                Pontius Pilate, and suffered and was buried; And the third day
                He rose again, according to the Scriptures; And ascended into
                heaven, and sitteth at the right hand of the Father; And He
                shall come again with glory to judge the living and the dead,
                Whose kingdom shall have no end. And we believe in the Holy
                Spirit, the Lord, and Giver of Life, Who proceedeth from the
                Father, Who with the Father and the Son together is worshipped
                and glorified, Who spoke by the Prophets; And we believe in One,
                Holy, Catholic and Apostolic Church. We acknowledge one Baptism
                for the remission of sins. We look for the Resurrection of the
                dead, And the Life of the age to come. Amen. *Note: as recited
                in Church, we use the first person singular, “I believe…,”
                throughout the Creed, although, as a conciliar decree, it was
                originally set down in the plural, “We believe….”
              </h5>
            </Col>
            <Col lg="6" md="12">
              <div className="image-container">
                <img
                  alt="..."
                  className="components-macbook"
                  src={require("assets/img/golf/believe.jpeg")}
                ></img>
                <img
                  alt="..."
                  className="table-img"
                  src={require("assets/img/golf/praying.jpeg")}
                ></img>
                {/* <img
                  alt="..."
                  className="share-btn-img"
                  src={require("assets/img/golf/prayinghands.png")}
                ></img> */}
                <img
                  alt="..."
                  className="coloured-card-btn-img"
                  src={require("assets/img/golf/prayinghands.png")}
                ></img>
                {/* <img
                  alt="..."
                  className="coloured-card-img"
                  src={require("assets/img/golf/prayinghands.png")}
                ></img> */}
                {/* <img
                  alt="..."
                  className="social-img"
                  src={require("assets/img/presentation-page/social-row.jpg")}
                ></img> */}
                {/* <img
                  alt="..."
                  className="linkedin-btn-img"
                  src={require("assets/img/presentation-page/linkedin-btn.jpg")}
                ></img> */}
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default BasicComponents;
