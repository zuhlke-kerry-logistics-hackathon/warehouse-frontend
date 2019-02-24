import React from "react";
import _ from "lodash";
import QRCode from "qrcode.react";
import PropTypes from "prop-types";

const format = data =>
  _.chain(data)
    .groupBy(d => d.location[5]) //by level
    .mapValues(a => _.sortBy(a, ["location"]))
    .mapValues(a => a.map(o => o.productId))
    .values()
    .reverse()
    .value();

const get_bay = data =>
  _.chain(data)
    .groupBy(d => d.location)
    .mapValues(a => a.map(o => o.location.slice(0, 5)))
    .values()
    .value();

function get_position(data) {
  let location = data.location;
  let x = [parseInt(location[5]), parseInt(location.slice(6, location.length))];

  return x;
}

const Bay = props => {
  console.log("props.data: ", props.data);

  const formattedData = format(props.data);

  console.log("formattedData", formattedData);

  const nLevels = props.nLevels;
  const nPositions = props.nPositions || 0;

  let finalData = [];
  for (let i = 0; i < nLevels; i++) {
    let l = [];
    for (let j = 0; j < nPositions; j++) {
      l.push(null);
    }
    finalData.push(l);
  }

  for (let data of props.data) {
    let [row, col] = get_position(data);
    console.log("Row Col", row, col);
    finalData[row - 1][col - 1] = data.productId;
  }
  finalData = finalData.reverse();

  const bayNum = get_bay(props.data)[0][0];
  const shouldReverse = bayNum[2] % 2 == 1;
  console.log("formattedData: ", formattedData);

  return (
    <div>
      <div className="bay-heading">Bay: {bayNum}</div>
      <div className="level-column">
        {formattedData.map((row, i) => {
          return (
            <Level
              shouldReverse={shouldReverse}
              levelNum={nLevels - i}
              products={row}
              key={i}
            />
          );
        })}
        <Positions nPositions={nPositions} shouldReverse={shouldReverse} />
      </div>
    </div>
  );
};

const Level = props => {
  const products = props.products;
  const shouldReverse = props.shouldReverse;

  const style = shouldReverse ? { flexDirection: "row-reverse" } : {};
  return (
    <div className="level" style={style}>
      <div className="level-number" style={shouldReverse ? { order: 1 } : {}}>
        <h4>Lv {props.levelNum}</h4>
      </div>
      {products.map((product, i) => {
        return (
          <div className="product" key={i} style={{ minWidth: "30px" }}>
            <h3>{product}</h3>
            {product && <QRCode value={product} size="20" />}
          </div>
        );
      })}
    </div>
  );
};

const Positions = props => {
  const position_num = [...Array(props.nPositions).keys()].map(i =>
    String(i + 1)
  );
  const style = props.shouldReverse ? { flexDirection: "row-reverse" } : {};
  return (
    <div className="positions" style={style}>
      <div className="position-number" />
      {position_num.map((position, i) => {
        return (
          <div className="position" key={i}>
            <h4>{position}</h4>
          </div>
        );
      })}
    </div>
  );
};

//Props needs to be either null or a string
// Bay.propTypes = {
//     data: PropTypes.array};
// Level.propTypes = {
//     products: PropTypes.String,
//     levelNum: PropTypes.String};
// Positions.propTypes = {nPositions: PropTypes.number
// };
export default Bay;
