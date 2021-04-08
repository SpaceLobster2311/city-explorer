import React from "react";

class GeoSearch extends React.Component {

  constructor(props) {
    super(props);

    this.textInput = React.createRef();
  }

  handleFormSubmitted = (event) => {
    // letting search component handle the form
    event.preventDefault();
    // send the info to app.js
    //grab info from text box to send to parent
    this.props.handleSearch(this.textInput.current.value);
  }
  render(){
    return( // last left off trying to get data to render in console.log
      
      <form onSubmit={(this.props.fetchData)}>
      <label>
        Type a City:
        <input type="text" ref={this.textInput}/>
      </label>
      <input type="submit" value="Explore!" />
    </form>
    );

  }
}
export default GeoSearch;