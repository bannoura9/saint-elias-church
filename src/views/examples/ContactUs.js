import React from "react";
// react plugin used to create google maps
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";

// reactstrap components
import {
  Button,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
} from "reactstrap";

// core components
// import DropdownWhiteNavbar from "components/Navbars/DropdownWhiteNavbar.js";
import ContactUsHeader from "components/Headers/ContactUsHeader.js";
// import PresentationHeader from "components/Headers/PresentationHeader.js";
import ScrollTransparentNavbar from "components/Navbars/ScrollTransparentNavbar.js";
import FooterSocial from "components/Footers/FooterSocial.js";

const MapWrapper = withScriptjs(
  withGoogleMap((props) => (
    <GoogleMap
      defaultZoom={13}
      defaultCenter={{ lat: 39.834713490789206, lng: -105.0714977155311 }}
      defaultOptions={{
        scrollwheel: false,
        styles: [
          {
            featureType: "water",
            elementType: "geometry",
            stylers: [{ color: "#e9e9e9" }, { lightness: 17 }],
          },
          {
            featureType: "landscape",
            elementType: "geometry",
            stylers: [{ color: "#f5f5f5" }, { lightness: 20 }],
          },
          {
            featureType: "road.highway",
            elementType: "geometry.fill",
            stylers: [{ color: "#ffffff" }, { lightness: 17 }],
          },
          {
            featureType: "road.highway",
            elementType: "geometry.stroke",
            stylers: [{ color: "#ffffff" }, { lightness: 29 }, { weight: 0.2 }],
          },
          {
            featureType: "road.arterial",
            elementType: "geometry",
            stylers: [{ color: "#ffffff" }, { lightness: 18 }],
          },
          {
            featureType: "road.local",
            elementType: "geometry",
            stylers: [{ color: "#ffffff" }, { lightness: 16 }],
          },
          {
            featureType: "poi",
            elementType: "geometry",
            stylers: [{ color: "#f5f5f5" }, { lightness: 21 }],
          },
          {
            featureType: "poi.park",
            elementType: "geometry",
            stylers: [{ color: "#dedede" }, { lightness: 21 }],
          },
          {
            elementType: "labels.text.stroke",
            stylers: [
              { visibility: "on" },
              { color: "#ffffff" },
              { lightness: 16 },
            ],
          },
          {
            elementType: "labels.text.fill",
            stylers: [
              { saturation: 36 },
              { color: "#333333" },
              { lightness: 40 },
            ],
          },
          { elementType: "labels.icon", stylers: [{ visibility: "off" }] },
          {
            featureType: "transit",
            elementType: "geometry",
            stylers: [{ color: "#f2f2f2" }, { lightness: 19 }],
          },
          {
            featureType: "administrative",
            elementType: "geometry.fill",
            stylers: [{ color: "#fefefe" }, { lightness: 20 }],
          },
          {
            featureType: "administrative",
            elementType: "geometry.stroke",
            stylers: [{ color: "#fefefe" }, { lightness: 17 }, { weight: 1.2 }],
          },
        ],
      }}
    >
      <Marker position={{ lat: 39.834713490789206, lng: -105.0714977155311 }} />
    </GoogleMap>
  ))
);

function ContactUs() {
  const [nameFocus, setNameFocus] = React.useState(false);
  const [emailFocus, setEmailFocus] = React.useState(false);
  const [numberFocus, setNumberFocus] = React.useState(false);

  // const [formData, setFormData] = React.useState({});

  let postData = {
    name: "",
    email: "",
    phone: "",
    message: "",
  };

  React.useEffect(() => {
    document.body.classList.add("contact-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    return function cleanup() {
      document.body.classList.remove("contact-page");
      document.body.classList.remove("sidebar-collapse");
    };
  }, []);

  const handleChange = (event) => {
    // setFormData({ [event.target.name]: event.target.value });
    postData["name"] = document.getElementById("name").value;
    postData["email"] = document.getElementById("email").value;
    postData["phone"] = document.getElementById("phone").value;
    postData["message"] = document.getElementById("message").value;
    console.log(postData);
  };

  const eventHnadler = (event) => {
    fetch("http://localhost:4000/contact-us", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(postData),
    })
      .then((response) => response.json())
      .then((res) => {
        console.log(res);
        // setFormData({});
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      {/* <DropdownWhiteNavbar /> */}
      {/* <PresentationHeader /> */}
      <ScrollTransparentNavbar />
      <div className="wrapper">
        <ContactUsHeader />
        <div className="main">
          <div className="contact-content">
            <Container>
              <Row>
                <Col className="ml-auto mr-auto" md="5">
                  <h2 className="title">Send us a message</h2>
                  <p className="description">
                    You can contact us with anything related to our Mass
                    Schedules, or services etc. We'll get in touch with you as
                    soon as possible. <br></br>
                    <br></br>
                  </p>
                  <Form id="contact-form">
                    <label>Your name</label>
                    <InputGroup
                      className={nameFocus ? "input-group-focus" : ""}
                    >
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="now-ui-icons users_circle-08"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        aria-label="Your Name..."
                        autoComplete="name"
                        placeholder="Your Name..."
                        id="name"
                        type="text"
                        // value={formData.name || ""}
                        onChange={handleChange}
                        onFocus={() => setNameFocus(true)}
                        onBlur={() => setNameFocus(false)}
                      ></Input>
                    </InputGroup>
                    <label>Email address</label>
                    <InputGroup
                      className={emailFocus ? "input-group-focus" : ""}
                    >
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="now-ui-icons ui-1_email-85"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        aria-label="Email Here..."
                        autoComplete="email"
                        placeholder="Email Here..."
                        id="email"
                        type="email"
                        // value={formData.email || ""}
                        onChange={handleChange}
                        onFocus={() => setEmailFocus(true)}
                        onBlur={() => setEmailFocus(false)}
                      ></Input>
                    </InputGroup>
                    <label>Phone</label>
                    <InputGroup
                      className={numberFocus ? "input-group-focus" : ""}
                    >
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="now-ui-icons tech_mobile"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        autoComplete="number"
                        placeholder="Number Here..."
                        id="phone"
                        type="text"
                        // value={formData.phone || ""}
                        onChange={handleChange}
                        onFocus={() => setNumberFocus(true)}
                        onBlur={() => setNumberFocus(false)}
                      ></Input>
                    </InputGroup>
                    <FormGroup>
                      <label>Your message</label>
                      <Input
                        id="message"
                        name="message"
                        rows="6"
                        type="textarea"
                        // value={formData.message || ""}
                        onChange={handleChange}
                      ></Input>
                    </FormGroup>
                    <div className="submit text-center">
                      <Button
                        className="btn-raised btn-round"
                        color="info"
                        defaultValue="Contact Us"
                        onClick={eventHnadler}
                      >
                        Contact Us
                      </Button>
                    </div>
                  </Form>
                </Col>
                <Col className="ml-auto mr-auto" md="5">
                  <div className="info info-horizontal mt-5">
                    <div className="icon icon-info">
                      <i className="now-ui-icons location_pin"></i>
                    </div>
                    <div className="description">
                      <h4 className="info-title">Find us at the office</h4>
                      <p>
                        7580 Pierce St, , <br></br>
                        Arvada, CO 80003, <br></br>
                      </p>
                    </div>
                  </div>
                  <div className="info info-horizontal">
                    <div className="icon icon-info">
                      <i className="now-ui-icons tech_mobile"></i>
                    </div>
                    <div className="description">
                      <h4 className="info-title">Give us a ring</h4>
                      <p>
                        George Shawareb <br></br>
                        303-463-1864 <br></br>
                        Mon - Fri, 8:00 AM-5:00 PM
                      </p>
                      <p>
                        Worship Time: <br></br>Sunday <br></br>10:00 AM - 12:00
                        PM
                      </p>
                    </div>
                  </div>
                  {/* <div className="info info-horizontal">
                    <div className="icon icon-info">
                      <i className="business_briefcase-24 now-ui-icons"></i>
                    </div>
                    <div className="description">
                      <h4 className="info-title">Legal Information</h4>
                      <p>
                        Creative Tim Ltd. <br></br>
                        VAT · EN2341241 <br></br>
                        IBAN · EN8732ENGB2300099123 <br></br>
                        Bank · Great Britain Bank
                      </p>
                    </div>
                  </div> */}
                </Col>
              </Row>
            </Container>
          </div>
        </div>
        <div className="big-map" id="contactUs2Map">
          <MapWrapper
            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAXz4FLcq_Z3Ia-0imnMIBIP1BQH5DOZ_U"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `100%` }} />}
            mapElement={<div style={{ height: `100%` }} />}
          />
        </div>
        <FooterSocial />
      </div>
    </>
  );
}

export default ContactUs;
