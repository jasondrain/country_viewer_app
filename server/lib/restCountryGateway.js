const axios = require("axios");

var restCountryGateway = {};

restCountryGateway.getCountries = async (countrySearchParams) => {
  console.log(
    `country search params :: ${JSON.stringify(countrySearchParams)}`
  );

  var fieldsToReturnFromAPI = [
    "name",
    "alpha2Code",
    "alpha3Code",
    "flag",
    "region",
    "subregion",
    "population",
    "languages",
  ];

  var searchTypeToEndpointMap = {
    fullName: "name",
    name: "name",
    alpha: "alpha",
  };

  /**
   * TODOs:
   *
   * add url to config file
   */
  const baseUrl = "https://restcountries.eu/rest/v2";
  const endpoint = searchTypeToEndpointMap[countrySearchParams.searchType];
  const searchStr = countrySearchParams.searchTerm;
  const fullUrl = `${baseUrl}/${endpoint}/${searchStr}`;
  const isSearchForFullName = countrySearchParams.searchType === "fullName";

  const paramsObject = { params: {} };
  paramsObject.params.fields = fieldsToReturnFromAPI.join(";");
  paramsObject.params.fullText = isSearchForFullName;

  console.log(`fullUrl :: ${fullUrl}`);
  console.log(`paramsObject :: ${JSON.stringify(paramsObject)}`);

  const res = await axios.get(fullUrl, paramsObject);
  // console.log(JSON.stringify(res))
  return res;
};

module.exports = restCountryGateway;
