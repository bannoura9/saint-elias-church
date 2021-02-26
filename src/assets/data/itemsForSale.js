import TeeTime from "../img/golf/teetime.jpg";
import GoldSponsor from "../img/golf/gold-sponsor.jpg";
import SilverSponsor from "../img/golf/Badge-Silver.png";
import HoleSponsor from "../img/golf/Hole-Sponsor.png";
import Donation from "../img/golf/Donation.jpg";
import Lunch from "../img/golf/Lunch.jpg";

import GolfOne from "../img/golf/golf-one.jpg";
import GolfTwo from "../img/golf/golf-two.jpg";
import GolfThree from "../img/golf/golf-three.jpg";

const itemsForSale = [
  {
    image: TeeTime,
    title: "Tee Time",
    description: "PURCHASE SAINT ELIAS 13TH ANNUAL GOLF TOURNAMENT TICKET",
    price: 150,
    path: "/products/tee-time",
    id: "tee-time",
    displayAdditionalFields: true,
    additionalImages: [GolfOne, GolfTwo, GolfThree],
  },
  {
    image: GoldSponsor,
    title: "Gold Sponsor",
    description:
      "Tournament Sponsorship Gold - Cost $2,500 (Includes Foursome)",
    price: 2500,
    path: "/products/gold-sponsor",
    id: "gold-sponsor",
    displayAdditionalFields: true,
    additionalImages: [GolfOne, GolfTwo, GolfThree],
  },
  {
    image: SilverSponsor,
    title: "Silver Sponsor",
    description: "Tournament Sponsorship Silver - $1500.00 (Includes Foursome)",
    price: 1500,
    path: "/products/silver-sponsor",
    id: "silver-sponsor",
    displayAdditionalFields: true,
    additionalImages: [GolfOne, GolfTwo, GolfThree],
  },

  {
    image: HoleSponsor,
    title: "Hole Sponsor",
    description:
      "Team Invitation Hole Sponsorship- Cost $ 200.00 (Does not Includes Foursome)",
    price: 200,
    path: "/products/hole-sponsor",
    id: "hole-sponsor",
    displayAdditionalFields: false,
    additionalImages: [GolfOne, GolfTwo, GolfThree],
  },
  {
    image: Lunch,
    title: "Lunch",
    description: "Saint Elias 14th Annual Golf Tournament lunch Tickets ",
    price: 40,
    path: "/products/lunch",
    id: "lunch",
    displayAdditionalFields: false,
    additionalImages: [GolfOne, GolfTwo, GolfThree],
  },
  // {
  //   image: Donation,
  //   title: "Donation",
  //   description: "Golf DONATION",
  //   price: "",
  //   path: "/products/donation",
  //   id: "donation",
  //   displayAdditionalFields: false,
  //   additionalImages: [GolfOne, GolfTwo, GolfThree],
  // },
];

export default itemsForSale;
