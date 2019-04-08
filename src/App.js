import React, { Component } from "react";
import Appbar from "./Components/Appbar";
import Appdrawer from "./Components/Appdrawer";
import "typeface-roboto";
import { withStyles } from "@material-ui/core/styles";
import "./App.css";
import MapContainer from "./Components/MapContainer";
import * as fourSquareAPI from "./Services/FoursquareAPI";
import escapeRegExp from "escape-string-regexp";
import Typography from "@material-ui/core/Typography";


const styles = theme => ({
  root: {
    display: "flex",
    backgroundColor: theme.palette.background.paper
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    margin:'25% auto',
    textAlign:'center'
    
  },
  map: {
    position: "relative",
    width: "100%",
    height: "calc(100vh - 56px)",
    marginTop: 56
  }
});

class App extends Component {
  state = {
    mobileOpen: false,
    showingMarkerIndex: null,
    appBarTitle: "Neighbourhood Maps",
    locations: [],
    query: "",
    error: false
  };
  // Update state so the next render will show the fallback UI.
  static getDerivedStateFromError(error) {
    return { error: true };
  }

  

  componentDidMount() {
    fourSquareAPI
      .getLocations("food")
      .then(res => {
        res.response.venues.forEach(venue => {
          this.setState(prevState => ({
            locations: [
              ...prevState.locations,
              {
                title: venue.name,
                location: {
                  lat: venue.location.lat,
                  lng: venue.location.lng
                },
                address: venue.location.formattedAddress,
                stats: venue.stats
              }
            ]
          }));
        });
      })
      .catch(err => window.alert("Cannot Fetch Data from Foursquare"));
  }
  //Functions to handle various events in app
  showAll = () => {
    this.setState({
      query: ""
    });
  };

  updateSearchQuery = query => {
    this.setState({
      query: query
    });
  };

  closeAppdrawer = () => {
    this.setState({
      mobileOpen: false
    });
  };

  changeAppBarTitle = title => {
    this.setState({
      appBarTitle: title
    });
  };

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  onMarkerClick = markerIndex => {
    if (this.state.showingMarkerIndex !== markerIndex) {
      this.setState({
        showingMarkerIndex: markerIndex
      });
    } else {
      this.setState({
        showingMarkerIndex: null
      });
    }
  };

  onClose = () => {
    this.setState({
      showingMarkerIndex: null
    });
  };

  render() {
    const { classes } = this.props;

    //Filter results as per search query
    let showingLocations;
    if (this.state.query) {
      const match = new RegExp(escapeRegExp(this.state.query), "i");
      showingLocations = this.state.locations.filter(locate =>
        match.test(locate.title)
      );
    } else {
      showingLocations = this.state.locations;
    }
    return (
      <div className={classes.root}>
        <Appbar
          handleDrawerToggle={this.handleDrawerToggle}
          title={this.state.appBarTitle}
        />
        <Appdrawer
          mobileOpen={this.state.mobileOpen}
          handleDrawerToggle={this.handleDrawerToggle}
          updateSearchQuery={this.updateSearchQuery}
          searchResults={showingLocations}
          onSearchResClick={this.onMarkerClick}
        />

        <div className={classes.toolbar} />

        <div className={classes.map}>
          {!this.state.error ? (
            <MapContainer
              locations={showingLocations}
              onMarkerClick={this.onMarkerClick}
              onClose={this.onClose}
              showingMarkerIndex={this.state.showingMarkerIndex}
              loadingElement={<div style={{ height: `100%` }} />}
              containerElement={<div style={{ height: `100%` }} />}
              mapElement={<div style={{ height: `100%` }} />}
            />
          ) : (
            <Typography className={classes.content}>Error Loading Map</Typography>
          )}
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(App);
