// getHotels.js
import Amadeus from "amadeus";
import constants from "./constants.js";

const amadeus = new Amadeus({
  clientId: constants.GDS_KEY,
  clientSecret: constants.GDS_SECRET,
});

const getHotels = (hotels) => {
  console.log("destination: ", area);
  amadeus.referenceData.locations.hotels.byCity
    .get({
      cityCode: area,
    })
    .then(function (response) {
      console.log(response);
      return response;
    })
    .catch(function (response) {
      console.error(response);
    });
};

export { getHotels };
