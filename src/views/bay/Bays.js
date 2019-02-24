import Bay from "./Bay";
import React, { Component } from "react";
import _ from "lodash";

function parse_location(location) {
  return {
    aisle: location.slice(0, 3),
    bay: location.slice(3, 5),
    level: parseInt(location[5]),
    position: parseInt(location.slice(6, location.length))
  };
}

function nLevelsAndPositions(bayData) {
  let locations = bayData.map(x => parse_location(x.location));
  let nLevels = 3//Math.max(0, ...locations.map(x => x.level));
  let nPositions = 5 //Math.max(0, ...locations.map(x => x.position));
  return [nLevels, nPositions];
}

export default class Bays extends Component {
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = {
      data: this.props.data
    };
  }

  render() {
    let data = this.props.data;
    let aisles = _.chain(data)
      .groupBy(x => parse_location(x.location).aisle)
      .value();

    return (
      <div>
        {_.map(aisles, aisle => {
          let bays = _.chain(aisle)
            .groupBy(x => parse_location(x.location).bay)
            .values()
            .value();

            console.log("Bays", bays)

          let shape = _.map(bays, x => nLevelsAndPositions(x));
          console.log('shape: ',shape);
          
          return _.map(bays, (bay, i) => {
            return (
              <Bay
                key={i}
                data={bay}
                nLevels={shape[i][0]}
                nPositions={shape[i][1]}
              />
            );
          });
        })}
      </div>
    );
  }
}
