const axios = require('axios')

var restCountryGateway = {}

restCountryGateway.getCountries = async (countrySearchParams) => {

    var fieldsToReturnFromAPI = [
        "name",
        "alpha2Code",
        "alpha3Code",
        "flag",
        "region",
        "subregion",
        "population",
        "languages"
    ]
    
    var searchTypeToEndpointMap = {
        "fullName": "name",
        "name": "name",
        "alpha2Code": "alpha2Code",
        "alpha3Code": "alpha3Code"
    }

    /**
     * countrySearchParams form:
     * 
     * {
     *     "searchType": Str
     *     "searchTerm": Str
     * }
     */
    // build the parameter set for the POST request
    //
    var baseUrl = 'https://restcountries.eu/rest/v2'

    console.log(`searchType :: ${countrySearchParams.searchType}`)
    console.log(`searchTypeToEndpointMap :: ${searchTypeToEndpointMap}`)
    console.log(`expected endpoint val :: ${searchTypeToEndpointMap[countrySearchParams.searchType]}`)

    var endpoint = searchTypeToEndpointMap[countrySearchParams.searchType]
    var searchStr = countrySearchParams.searchTerm
    var fullUrl = `${baseUrl}/${endpoint}/${searchStr}`
    var isSearchForFullName = countrySearchParams.searchType == 'fullName'
    
    var paramsObject = { params: {} }
    paramsObject.params.fields = fieldsToReturnFromAPI.join(';')
    paramsObject.params.fullText = isSearchForFullName

    console.log(`fullUrl :: ${fullUrl}`)
    console.log(`paramsObject :: ${JSON.stringify(paramsObject)}`)

    // perform the HTTP call
    var res = await axios.get(fullUrl, paramsObject)
    return res
}

var buildGetCountriesRequestObject = (countrySearchParams) => {

}

var buildRequestUrl = (countrySearchParams) => {

}

module.exports = restCountryGateway