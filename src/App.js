
import './App.css';
import React from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Jumbotron } from 'react-bootstrap';
import Weather from './Weather.js';
import Movies from './Movies.js';


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state ={
      citySearched: '',
      cityData: {},
      weatherData: [],
      movie: [],
    }
  }
  handleformSubmit = async (event) => {
    event.preventDefault();
    console.log(this.state.citySearched)
    try{
      let cityData = await axios.get(`https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_CITY_KEY}&q=${this.state.citySearched}&format=json`);
      console.log(cityData);
      let importantCity = cityData.data[0];
      this.setState({
        cityData: importantCity,
        lat: cityData.data[0].lat,
        lon: cityData.data[0].lon,
      });

      this.getWeatherData();
      this.getMovieData();
    } catch(err) {
      console.log(err);
      this.setState({error: err.message})
    }
  }

  getMovieData = async (citySearched) => {
    try{
    const movieData = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/movies`,
    {
      params: {movie: this.state.citySearched}
    })
    this.setState({movie: movieData.data})
    console.log(movieData)
  }catch(error){
      this.setState({
        errorResponse: error.errorResponse,
        error: true,
      })
    }
  }


  getWeatherData = async () => {
    try {
    const weatherData = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/weather`,
    {
      params: {lat: this.state.lat,
      lon: this.state.lon,}
    })

    this.setState({weatherData: weatherData.data})
    console.log(this.state);
    } catch(error){
      this.setState({
        errorResponse: error.errorResponse,
        error: true,
      })
    }
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
        {this.state.error ? <h3>{this.state.error}</h3> : ''}
        {this.state.cityData.lat ? 
        
        (
        <>
        <Jumbotron>
          <h3>{this.state.cityData.display_name}</h3>
          <h5>{this.state.cityData.lat}, {this.state.cityData.lon}</h5>
          <img src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_CITY_KEY}&center=${this.state.cityData.lat},${this.state.cityData.lon}&zoom=13`} alt={`Map of ${this.state.cityData.display_name}`} />
        </Jumbotron>
        <Weather weatherData={this.state.weatherData}/>
        <Movies movieData={this.state.movie}/>
        </>
         ) : ''}
      </>
    );
  }
}

export default App;
