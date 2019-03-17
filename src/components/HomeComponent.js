import React, { Component } from 'react';
import Weather from './Weather';
import { Row, Col,Form, FormGroup, Input, Button } from "reactstrap";
import { Redirect } from "react-router-dom";


class Home extends Component {

    constructor(props) {
        super(props);
        this.state={
            term:'',
            link:'',
            searchStatus:false
        };
        this.search = this.search.bind(this);
        this.handleChange = this.handleChange.bind(this);
        
    }
    componentDidMount(){
        console.log(this.props);
        
    }

    search(e){
        console.log("Search thins..."+ this.state.term);
        this.setState({
            link:"/search/"+this.state.term,
            searchStatus:true
        })
        e.preventDefault();

    }
    handleChange(e){   
             
        const target = e.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]:value
        })
        console.log(this.state.term);
        
    }
    
    render() {
        if(this.state.searchStatus) return <Redirect to={this.state.link} />
        return (
            <div>
                <Row>
                    <Col>
                    <Form onSubmit={this.search}>
                        <FormGroup>
                        <Input type="text" name="term" onChange={this.handleChange} id="" placeholder="Enter city" value={this.state.term} />
                        </FormGroup>
                        <Button>Submit</Button>
                    </Form>
                    </Col>
                </Row>
                    <Weather cities={["istanbul","berlin","london","helsinki","dublin","vancouver"]} ></Weather>
            </div>
        );
    }
}



export default Home;
