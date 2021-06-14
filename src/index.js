import React from 'react';
import ReactDOM from 'react-dom';
import SeasonDisplay from './SeasonDisplay';

class App extends React.Component {
  // React.component already has it's own constructor. With super(props) we're making sure that the parenting constructor still gets called.
  constructor(props) {
    super(props);
    // defaulting to null because we don't know the latitude value yet; this is the only time to directly assign to this.state
    this.state = { lat: null, errorMessage: '' };
  }

  //the react documentation states componentDidMount() as the best place to load data
  componentDidMount() {
    window.navigator.geolocation.getCurrentPosition(
      (position) => this.setState({ lat: position.coords.latitude }),
      (err) => this.setState({ errorMessage: err.message })
    );
  }
  // React requires us to define render()
  render() {
    // the following is referred to as conditional rendering. we're returning different JSX each time the component is rerendered based on the state update
    if (this.state.errorMessage && !this.state.lat) {
      return <div>Error: {this.state.errorMessage}</div>;
    }
    if (!this.state.errorMessage && this.state.lat) {
      return <div>Latitude: {this.state.lat}</div>;
    }
    return <div>Loading!</div>;
  }
}

ReactDOM.render(<App />, document.querySelector('#root'));
