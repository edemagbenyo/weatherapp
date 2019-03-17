import React, { Component } from 'react';
import Weather from './Weather';


class Home extends Component {

    constructor(props) {
        super(props);
        this.state={
            term:''
        };

    }
    
    render() {
     
        return (
            <div>
                
                    <Weather cities={["istanbul","berlin","london","helsinki","dublin","vancouver"]} ></Weather>
            </div>
        );
    }
}



export default Home;
