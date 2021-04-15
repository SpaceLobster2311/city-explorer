
import './App.css';
import React from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Jumbotron } from 'react-bootstrap';


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state ={
      citySearched: '',
      cityData: {}
    }
  }
  handleformSubmit = async (event) => {
    event.preventDefault();
    console.log(this.state.citySearched)
    let cityData = await axios.get(`https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_CITY_KEY}&q=${this.state.citySearched}&format=json`);
    console.log(cityData);
    let importantCity = cityData.data[0];
    this.setState({
      cityData: importantCity,
    });
  }
  render(){
    return(
      <>
        <h1>City Explorer</h1>
        <Form onSubmit={this.handleformSubmit}>
          <Form.Group controlId ="city">
            <Form.Label>City Name</Form.Label>
            <Form.Control value ={this.state.citySearched} onInput={e => this.setState({citySearched: e.target.value})}></Form.Control>
          </Form.Group>
          <Button variant ="primary" type ="submit">Explore</Button>
        </Form>
        {this.state.cityData.lat ? <Jumbotron>
          <h3>{this.state.cityData.display_name}</h3>
          <h5>{this.state.cityData.lat}, {this.state.cityData.lon}</h5>
        </Jumbotron> : ''}
      </>
    );
  }
}

export default App;
