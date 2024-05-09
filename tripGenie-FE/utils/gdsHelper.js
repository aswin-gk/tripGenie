// getHotels.js
import Amadeus from "amadeus";
import constants from "./constants.js";

const amadeus = new Amadeus({
  clientId: constants.GDS_KEY,
  clientSecret: constants.GDS_SECRET,
});

const getHotels = (cityCode) => {
  console.log("destination: ", cityCode);
  amadeus.referenceData.locations.hotels.byCity
    .get({
      cityCode: cityCode,
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
