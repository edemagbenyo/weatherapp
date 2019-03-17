import React, { Component } from 'react';
import { withRouter, NavLink } from 'react-router-dom'
import { connect } from 'react-redux';
import { queryWoeid } from "../redux/actions/weatherAction";
import {Card, CardBody, CardTitle , CardImg, CardText, Col, Row} from 'reactstrap';
import Search from "./SearchComponent";

let allweathers =[];
class Weather extends Component {
    constructor(props) {
        super(props);
        this.state={

        }
    }
  
    getTodayWeather(weather){
        return weather.consolidated_weather[0];
    }
    getWeatherIcon(weather){
        return "https://www.metaweather.com/static/img/weather/"+ this.getTodayWeather(weather).weather_state_abbr + ".svg"
    }
 
    componentWillUnmount(){        
        allweathers = [];
    }
    componentDidMount(){
        if(this.props.hasOwnProperty('isSearching') && this.props.isSearching)
        {
            let cities =[];
            cities.push(this.props.match.params.city);
            cities.forEach(element => {            
                    this.props.queryWoeid(element);
                });
        }else{
            this.props.cities.forEach(element => {            
            this.props.queryWoeid(element);
        });
        }
        
    }
    
    render() {
        //CHECKING THE WAITING VALUE IS FALSE
        if(!this.props.weather.waiting ){
            allweathers.push(this.props.weather.weather);
            //RESET THE WEATHER TO EMPTY OBJECT
            this.props.weather.weather ={};  
            console.log(this.props.weather);
                  
    }
        return (
            <Row>
                {(this.props.isSearching) ? <Col md="12"> <Search /></Col>  : null}
            { (!this.props.weather.waiting)?
                allweathers.filter(el=>Object.keys(el).length>0).map(element=>
                    <Col>
                        <Card>
                    <CardImg top width="80%" src={this.getWeatherIcon(element)} alt="Card image cap" />
                    <CardBody>
                        <CardTitle>{element.title}</CardTitle>
                        <CardText>
                            <small>Temp: {this.getTodayWeather(element).the_temp.toFixed(2)} &#176; C</small>
                            <small>Max Temp: {this.getTodayWeather(element).max_temp.toFixed(2)} &#176; C</small>
                            <small>Min Temp: {this.getTodayWeather(element).min_temp.toFixed(2)} &#176; C</small>
                        </CardText>
                        
                            <NavLink className="nav-link" to={`/weather/${element.woeid}`}>Details</NavLink>
                    </CardBody>
                    </Card>
                    </Col>
                ) : <p>Loading Weather information...</p>
            }
          </Row>
        );
    }
}
const mapStateToProps = state => {
    return {
      weather: state.weather
    }
  }
  const mapDispatchToProps = dispatch => ({
    queryWoeid: (city) => dispatch(queryWoeid(city)),
});

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Weather));
