import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
class Movies extends React.Component {
  render() {
    let totalListGroups = this.props.movieData.map((film, index) =>(
      <ListGroup.Item key={index}>{`${film.title}: ${film.overview}`}</ListGroup.Item>
    ))
    console.log('in movie js', this.props.movieData)
    return(
      <ListGroup>
        {totalListGroups}
      </ListGroup>
    );
  }
}

export default Movies;