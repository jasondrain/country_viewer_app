import React from "react";
import "./App.css";

function App() {
  const [name, setName] = React.useState("");
  const [fullName, setFullName] = React.useState("");
  const [alphaCode, setAlphaCode] = React.useState("");
  const [resultsData, setResultsData] = React.useState(null);

  const isInputValid = () => {
    return getNonEmptyInputValues().length === 1;
  };

  const getNonEmptyInputValues = () => {
    return [name, fullName, alphaCode].filter((val) => val !== "");
  };

  const handleSearch = () => {
    if (!isInputValid()) {
      /**
       * TODO:
       * It would be nice to have this message shown directly on the page instead of through an alert.
       * Also, we should expand validation to handle different cases, e.g. only strings of length 2 or 3
       * would be allowed in the 'Alpha Code' field.
       */
      alert("Please enter a single value in the input form");
    } else {
      retrieveAndSetCountryData();
    }
  };

  const retrieveAndSetCountryData = () => {
    const searchParams = {
      params: {},
    };

    /**
     * TODO:
     * The logic to assign the search params could be pulled into a separate module,
     * which would make this code more testable.
     */
    if (name !== "") {
      searchParams.params.searchType = "name";
      searchParams.params.searchTerm = name;
    } else if (fullName !== "") {
      searchParams.params.searchType = "fullName";
      searchParams.params.searchTerm = fullName;
    } else if (alphaCode !== "") {
      searchParams.params.searchType = "alpha";
      searchParams.params.searchTerm = alphaCode;
    }

    /**
     * TODO:
     * pull the base url into a config file
     * sanitize the search strings from the client
     */
    fetch(
      `http://localhost:3001/countryData?searchTerm=${searchParams.params.searchTerm}&searchType=${searchParams.params.searchType}`
    )
      .then((result) => result.json())
      .then((body) => {
        setResultsData(body);
      })
      .catch((err) => {
        console.log(`caught error :: ${JSON.stringify(err)}`);
      });
  };

  //TODO: Just make the UI look less plain. Add some more color and styles and maybe justify the text more.
  return (
    <div className="App">
      <h1>Country Search</h1>
      <div className="GenericDataContainer">
        <label>Name:</label>
        <input
          type="text"
          id="nameInput"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label>Full Name:</label>
        <input
          type="text"
          id="fullNameInput"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        <label>Alpha Code:</label>
        <input
          type="text"
          id="alphaCodeInput"
          value={alphaCode}
          onChange={(e) => setAlphaCode(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      <div className="GenericDataContainer">
        {resultsData &&
          (resultsData.countryData.length === 0 ? (
            <p>No results</p>
          ) : (
            <div>
              <table className="CountryResultsTable">
                <tbody>
                  <tr>
                    <th>Country Name</th>
                    <th>Alpha 2 Code</th>
                    <th>Alpha 3 Code</th>
                    <th>Region</th>
                    <th>Subregion</th>
                    <th>Languages</th>
                    <th>Population</th>
                    <th>Flag</th>
                  </tr>
                  {resultsData.countryData.map((country) => (
                    <tr className="GenericTableRow">
                      <td>{country.name}</td>
                      <td>{country.alpha2Code}</td>
                      <td>{country.alpha3Code}</td>
                      <td>{country.region}</td>
                      <td>{country.subregion}</td>
                      <td>{country.languages}</td>
                      <td>{country.population}</td>
                      <td>
                        <img
                          height="30"
                          width="60"
                          src={country.flag}
                          alt={country.name + " flag"}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
      </div>

      <div className="GenericDataContainer">
        {resultsData &&
          (resultsData.aggregatedCountryData.numberOfCountries === 0 ? (
            ""
          ) : (
            <div>
              <table className="CountryAggregateDataTable">
                <tbody>
                  <tr>
                    <th>Subregion</th>
                    <th>Count</th>
                  </tr>
                  {resultsData.aggregatedCountryData.subregions.map(
                    (subregion) => (
                      <tr className="GenericTableRow">
                        <td>{subregion.subregionName}</td>
                        <td>{subregion.count}</td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
              <div className="GenericDataContainer">
                <span>
                  <b>Total Number Of Countries: </b>
                  {resultsData.aggregatedCountryData.numberOfCountries}
                </span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default App;
