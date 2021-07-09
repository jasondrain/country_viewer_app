const axios = require("axios");

var restCountryGateway = {};

restCountryGateway.getCountries = async (countrySearchParams) => {
  const serializedFieldsToReturnFromAPI =
    "name;alpha2Code;alpha3Code;flag;region;subregion;population;languages";

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
  paramsObject.params.fields = serializedFieldsToReturnFromAPI;
  paramsObject.params.fullText = isSearchForFullName;

  const res = await axios.get(fullUrl, paramsObject);
  return res;
};

module.exports = restCountryGateway;
