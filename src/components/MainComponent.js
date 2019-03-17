import React, { Component } from "react";
import { Container} from 'reactstrap';
import Header from "./HeaderComponent";
import { Switch, Route  } from "react-router-dom";
import Home from "./HomeComponent";
import Weather from "./Weather";
import WeatherDetail from "./WeatherDetail";




export default class Main extends Component{
    
    render(){
        return (
        <Container>
                <Header />
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route
                        path='/search/:city'
                        render={(props) => <Weather {...props} cities={[...props.match.params]} />}
                        />
                    <Route path="/weather/:woeid" component={WeatherDetail}/>

                </Switch>
        </Container>
        );
    }
}