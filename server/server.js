const express = require("express");
const cors = require("cors");
const dataProvider = require("./lib/countryDataProvider");
const app = express();
const port = 3001;

// TODO: Add more restrictive CORS policy, maybe?
app.use(cors());

app.get("/countryData", (req, res) => {
  let countrySearchParams = {
    searchTerm: req.query.searchTerm,
    searchType: req.query.searchType,
  };

  dataProvider.getCountryData(countrySearchParams).then((countryData) => {
    res.send(countryData);
  });
});

app.listen(port, () => {
  console.log(`REST Countries App listening at http://localhost:${port}`);
});
