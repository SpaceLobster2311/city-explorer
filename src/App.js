
import './App.css';
import React from 'react';
import axios from 'axios';
import GeoSearch from './GeoSearch';


class App extends React.Component {

  // what to track state if we have searched or not
  constructor(props){
    super(props);

    this.state={
      haveWeSearchedYet: false,
      citySearchedFor: '',
    };
  }

  //functions to call when user searched
  handleSearch = async (citySearchedFor) => {
    console.log('works');
    this.setState({
      haveWeSearchedYet: true,
      citySearchedFor: citySearchedFor
    });
    // make request from locationIQ
  }
  fetchData = async () => {
    console.log('fetching')
    // this is where we grab data from api and store as variable
    let mapsData = await axios.get(`https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_CITY_KEY}&q=${this.citySearchedFor}}&format=json`);
    console.log(mapsData)
  } 

  render(){
    return(
      <div>
      <h1>Welcome to CityExplorer</h1>
      <h2 onClick={this.fetchData}>CityMaps!</h2>
      <GeoSearch handleSearch={this.handleSearch}/>
      </div>
    );
  }
}

export default App;
