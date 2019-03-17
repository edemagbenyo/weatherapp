
import * as ActionTypes from "../ActionTypes";

//Fetch the WOEID
export const queryWoeid = (term) => dispatch => {
    //SEND WAITING ACTION
    dispatch(waitingWeather());
  fetch("http://weather.test/weather.php?command=search&keyword="+term)
  .then(response => {
      if (response) {
        //CONVERT THE RESPONSE TO JSON
          return response.json()
        } else {
          //ELSE WE THROW AN ERROR
          var error = new Error("Error" + response.status );
          error.response = response;
          throw error;
        }
      }, error => {
        var errorMess = new Error(error.message);
        throw errorMess;
      })
    .then(response => response[0].woeid)
    .then(woeid =>
      dispatch(queryWeather(woeid,term))
    )
    //CATCH AND DISPLAY ANY ERROR
    .catch(error => dispatch(failedWeather(error.message)));
}

//GET THE WEATHER DETAILED INFORMATION
export const queryWeather = (woeid,term=null) => dispatch => {
  dispatch(waitingWeather());
  fetch( "http://weather.test/weather.php?command=location&woeid="+woeid)
    .then(response => {
      if (response.ok) {          
          return response.json()
        } else {
          console.log("not fetching....");
          var error = new Error("Error" + response.status + ": " + response.statusText);
          error.response = response;
          throw error;
        }
      }, error => {
        var errorMess = new Error(error.message);
        throw errorMess;
      })
    .then(response => console.log(response)
    )
    .then(weather =>
      dispatch({
        type: ActionTypes.QUERY_LOCATION,
        payload: weather,
      }
    ))
    //CATCH AND DISPLAY ANY ERROR
    .catch(error => dispatch(failedWeather(error.message)))
}


export const failedWeather = (errmess) => ({
    type: ActionTypes.FAILED_QUERY,
    payload: errmess
});
export const waitingWeather = () => ({
    type: ActionTypes.WAITING_WEATHER_INFO,
});