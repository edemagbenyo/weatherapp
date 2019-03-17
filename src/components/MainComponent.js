import React, { Component } from "react";
import { Container} from 'reactstrap';
import Header from "./HeaderComponent";
import { Switch, Route  } from "react-router-dom";
import Home from "./HomeComponent";




export default class Main extends Component{
    render(){
        return (
        <Container>
                <Header />
                <Switch>
                    <Route exact path="/" component={Home}/>
                </Switch>
        </Container>
        );
    }
}