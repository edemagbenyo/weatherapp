import * as ActionTypes from '../ActionTypes';


const initialState = {
    weather: {},

};

export default function (state = initialState, action) {
    switch (action.type) {
      case ActionTypes.WAITING_WEATHER_INFO:
            return { ...state, waiting:true };
      case ActionTypes.QUERY_LOCATION:
            return { ...state, weather:action.payload , waiting:false };
      case ActionTypes.FAILED_QUERY:
            return { ...state, weather:{} , error:true };
      default:
        return state;
    }
}