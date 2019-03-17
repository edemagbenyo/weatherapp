import React, { Component } from 'react';
import Weather from './Weather';
import Search from './SearchComponent';


class Home extends Component {

    render() {
        return (
            <div>
                <Search />
                    <Weather cities={["istanbul","berlin","london","helsinki","dublin","vancouver"]} ></Weather>
            </div>
        );
    }
}



export default Home;
