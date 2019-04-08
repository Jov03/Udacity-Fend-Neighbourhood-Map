const clientId = "2SRB54WTWGAC11J2JQAUAIXIM1IFFLCOEYJSNETKRBEYKDYE";
const clientSecret = "P2BBCKO2IC5P0UVRO5ICDNN0XVDEFCWC0WKSJGIEK5E02ZQM";

  
//Fetch locations from foursquare
export function getLocations(query) {
  let requestParams = {
    clientId: clientId,
    clientSecret: clientSecret,
    limit: 10,
    v: 20180323,
    ll: "28.492450,77.290510",
    query: query
  };
  return fetch(
    `https://api.foursquare.com/v2/venues/search?client_id=${
      requestParams.clientId
    }&client_secret=${requestParams.clientSecret}&limit=${
      requestParams.limit
    }&ll=${requestParams.ll}&query=${requestParams.query}&v=${requestParams.v}`)
    .then(checkStatus)
    .then(res => res.json());
}

// raises an error in case response status is not a success
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    var error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}
