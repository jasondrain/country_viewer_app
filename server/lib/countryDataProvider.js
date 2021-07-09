const restCountryGateway = require("./restCountryGateway");

const countryDataProvider = {};

countryDataProvider.getCountryData = async (countrySearchParams) => {
  const restCountryResponse = await restCountryGateway
    .getCountries(countrySearchParams)
    .catch((e) => {
      console.log("encountered an error calling the REST Countries API");
    });

  if (!restCountryResponse) {
    return {
      countryData: [],
      aggregatedCountryData: {
        numberOfCountries: 0,
        subregions: [],
      },
    };
  }

  /**
   * This code allows us to account for the formatting differences between the multiple endpoints.
   * The alpha code endpoints return the data just as one single object, whereas the name endpoints
   * return it as an array of objects. So, if it's an alpha code endpoint that we've called then we
   * just wrap the data in an array so that _massageCountryData and _aggregateCountry Data can
   * process all data regardless of where it originated.
   */
  let rawCountryData = restCountryResponse.data;
  if (countrySearchParams.searchType === "alpha") {
    rawCountryData = [rawCountryData];
  }

  const filteredCountryDataArray = massageCountryData(rawCountryData);
  const aggregatedCountryData = aggregateCountryData(rawCountryData);

  return {
    countryData: filteredCountryDataArray,
    aggregatedCountryData: aggregatedCountryData,
  };
};

function aggregateCountryData(rawCountryData) {
  let numberOfCountries = 0;
  const subregionsObj = {};

  for (const country of rawCountryData) {
    if (!subregionsObj.hasOwnProperty(country.subregion)) {
      subregionsObj[country.subregion] = 0;
    }
    subregionsObj[country.subregion] = subregionsObj[country.subregion] + 1;
    numberOfCountries++;
  }

  const subregionsArray = [];
  for (const [subregionName, subregionCount] of Object.entries(subregionsObj)) {
    subregionsArray.push({
      subregionName: subregionName,
      count: subregionCount,
    });
  }

  return {
    numberOfCountries: numberOfCountries,
    subregions: subregionsArray,
  };
}

function massageCountryData(rawCountryData) {
  const processedCountryData = rawCountryData.map((country) => {
    country.languages = country.languages.map((language) => {
      return language.name;
    });
    country.languages = country.languages.join(", ");
    return country;
  });
  return processedCountryData.sort((country1, country2) => {
    return country2.population - country1.population;
  });
}

module.exports = countryDataProvider;
