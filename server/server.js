const express = require("express");
const cors = require("cors");
const dataProvider = require("./lib/countryDataProvider");
const app = express();
const port = 3001;

app.use(cors());

app.get("/countryData", (req, res) => {
  let countrySearchParams = {
    searchTerm: req.query.searchTerm,
    searchType: req.query.searchType,
  };

  console.log(`countrySearchParams :: ${JSON.stringify(countrySearchParams)}`);

  dataProvider.getCountryData(countrySearchParams).then((countryData) => {
    console.log(countryData);
    res.send(countryData);
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
