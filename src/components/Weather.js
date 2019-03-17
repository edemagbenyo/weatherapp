import React, { Component } from 'react';
import { withRouter, NavLink } from 'react-router-dom'
import { connect } from 'react-redux';
import { queryWoeid } from "../redux/actions/weatherAction";
import {Card, CardBody, CardTitle , CardImg, CardText, Col, Row} from 'reactstrap';


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
    componentDidUpdate(){
        console.log("component updated");
        
    }
    componentWillUnmount(){
        console.log("removing all weathers....",this.props.weather.weather);
        
        allweathers = [];
    }
    componentDidMount(){

        this.props.cities.forEach(element => {
            console.log(element);
            
            this.props.queryWoeid(element);
        });
        
    }
    
    render() {
        if(!this.props.weather.waiting ){
            allweathers.push(this.props.weather.weather);
            this.props.weather.weather ={};        
    }
        return (
            <Row>
            { (!this.props.weather.waiting)?
                allweathers.filter(el=>Object.keys(el).length>0).map(element=>
                    <Col md="2">
                        <Card>
                    <CardImg top width="80%" src={this.getWeatherIcon(element)} alt="Card image cap" />
                    <CardBody>
                        <CardTitle>{element.title}</CardTitle>
                        <CardText>
                            <small>Temp: {this.getTodayWeather(element).the_temp.toFixed(2)} &#176; C</small>
                            <small>Max Temp: {this.getTodayWeather(element).max_temp.toFixed(2)} &#176; C</small>
                            <small>Min Temp: {this.getTodayWeather(element).min_temp.toFixed(2)} &#176; C</small>
                        </CardText>
                        
                            <NavLink className="nav-link" to={`weather/${element.woeid}`}>Details</NavLink>
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