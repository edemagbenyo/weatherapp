import React, { Component } from 'react';
import {queryWeather} from '../redux/actions/weatherAction';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import {Row, Col, Card, CardBody, CardTitle , CardImg, CardText} from 'reactstrap';



class WeatherDetail extends Component {

    componentDidMount(){
        this.props.queryWeather(this.props.match.params.woeid);
    }

    getDayOfWeek(date){
        let newDate = new Date(date);
        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        return days[newDate.getDay()]
    }
    formatDate(date){
        let result =  new Date(date);
        return result.getFullYear() + "-" + (result.getMonth()+1) +"-" + result.getDate() + " " + result.getHours() + ":" + result.getMinutes() + ":"+ result.getSeconds();
    }
    render() {

        let todayWeather = {};
        if(Object.keys(this.props.weather.weather).length>0){            
            todayWeather = this.props.weather.weather.consolidated_weather[0];
        }
        
        
        return (
            <div>
                {
                    (Object.keys(this.props.weather.weather).length>0 )?
                    <div>
                        <Row>
                            <Col><h2>{this.props.weather.weather.title} weather information</h2></Col>
                        </Row>
                    <Row>
                        <Col md="3">
                                <Card>
                                <CardImg top width="80%" src={"https://www.metaweather.com/static/img/weather/"+ todayWeather.weather_state_abbr + ".svg"} alt="Card image cap" />
                                </Card>
                        </Col>
                        <Col md="9">
                                <Card>
                                <CardBody>
                                    <CardTitle>{this.props.weather.weather.title}</CardTitle>
                                    <CardText>
                                        <small>Temp: {todayWeather.the_temp.toFixed(2)} &#176; C <br></br></small> 
                                        <small>Max Temp: {todayWeather.max_temp.toFixed(2)} &#176; C <br></br></small> 
                                        <small>Min Temp: {todayWeather.min_temp.toFixed(2)} &#176; C <br></br></small>
                                        <small>Sunrise: {this.formatDate(this.props.weather.weather.sun_rise)} <br></br></small>
                                        <small>Sunset: {this.formatDate(this.props.weather.weather.sun_set)} <br></br></small>
                                    </CardText>
                                    </CardBody>
                                </Card>
                        </Col>

                    </Row>
                    <Row>
                        <Col><h2>Consolidated Weather</h2></Col>
                    </Row>
                    <Row>

                        {this.props.weather.weather.consolidated_weather.filter((v,i)=>i!==0).map(v=><Col>
                            <Card>
                                <CardImg top width="80%" src={"https://www.metaweather.com/static/img/weather/"+ v.weather_state_abbr + ".svg"} alt="Card image cap" />
                                <CardBody>
                                    <CardTitle>{v.title}</CardTitle>
                                    <CardText>
                                        <small>Day: <b>{this.getDayOfWeek(v.applicable_date)}</b> <br></br> </small>
                                        <small>Temp: {v.the_temp.toFixed(2)} &#176; C <br></br> </small>
                                        <small>Max Temp: {v.max_temp.toFixed(2)} &#176; C <br></br></small>
                                        <small>Min Temp: {v.min_temp.toFixed(2)} &#176; C <br></br></small>
                                    </CardText>
                                    </CardBody>
                                </Card>
                        </Col>)}
                    </Row>
                    </div>
                    :
                    <Row>
                        <Col>
                            <p>Loading...</p>
                        </Col>
                    </Row>
                }
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
      weather: state.weather,
    }
  }
  const mapDispatchToProps = dispatch => ({
    queryWeather: (woeid) => dispatch(queryWeather(woeid)),
});
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(WeatherDetail));
