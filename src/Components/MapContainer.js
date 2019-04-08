/*global google*/

import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import { compose, withProps } from "recompose";


import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";

//This component renders the map and markers for the locations it receive as props
export class MapContainer extends Component {
  render() {
    let { locations } = this.props;

    return (
      <GoogleMap
        defaultZoom={12}
        defaultCenter={{ lat: 28.49245, lng: 77.29051 }}
      >
        {locations.map((locate, index) => (
          <Marker
            key={index}
            title={locate.title}
            position={locate.location}
            onClick={() => this.props.onMarkerClick(index)}
            animation={
              index === this.props.showingMarkerIndex &&
              google.maps.Animation.BOUNCE
            }
          >
            {index === this.props.showingMarkerIndex && (
              <InfoWindow onCloseClick={() => this.props.onClose()}>
                <div>
                  <Typography variant="h6" gutterBottom>
                    {locate.title}
                  </Typography>
                  <Typography variant="subtitle1">
                    {locate.address.join(",")}
                  </Typography>
                  <Divider />
                  <Typography variant="subtitle1">
                    {`TipCount: ${locate.stats.tipCount} UsersCount: ${
                      locate.stats.usersCount
                    } CheckinsCount: ${
                      locate.stats.checkinsCount
                    } visitsCount: ${locate.stats.visitsCount}`}
                  </Typography>
                </div>
              </InfoWindow>
            )}
          </Marker>
        ))}
      </GoogleMap>
    );
  }
}

//here compose has been used to get a single component by using various HOCs(Higher Order Components)
export default compose(
  withProps({
    googleMapURL:'https://maps.googleapis.com/maps/api/js?key=AIzaSyCMn_DtVKRdAMwyxcNuhHfcTBZzRt2dkGY&libraries=geometry&v=3',
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `100%` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap
)(MapContainer);
