// getHotels.js
import Amadeus from "amadeus";
import constants from "./constants.js";

const amadeus = new Amadeus({
  clientId: constants.GDS_KEY,
  clientSecret: constants.GDS_SECRET,
});

const getHotels = async (cityCode) => {
  console.log("destination: ", cityCode);
  try {
    const response = await amadeus.referenceData.locations.hotels.byCity.get({
      cityCode: cityCode,
    });
    console.log(response);
    return response; // Assuming the response contains data property
  } catch (error) {
    console.error(error);
    throw error; // Rethrow the error to be handled by the caller
  }
};

const getCity = async (cityCode) => {
  console.log("destination: ", cityCode);
  try {
    const response = await amadeus.referenceData.locations.cities
      .get({
        keyword: cityCode,
      })
      .catch(function (response) {
        console.error(response);
      });
    console.log("resp: ", response);
    return response?.result?.data; // Assuming the response contains data property
  } catch (error) {
    console.error(error);
    throw error; // Rethrow the error to be handled by the caller
  }
};

export { getHotels, getCity };
