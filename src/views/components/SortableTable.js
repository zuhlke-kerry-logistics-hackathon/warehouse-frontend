import sortBy from 'lodash/sortBy';
import map from 'lodash/map';
import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';
import QRCode from 'qrcode.react';

export default class SortableTable extends Component {
  
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = { 
      column: null,
      data: this.props.data,
      direction: null,
    };
  }

  handleReset = () => {
    this.setState({
      data: []
    })
  }

  handleSort = clickedColumn => () => {
    const { column, direction } = this.state

    const { data } = this.props

    if (column !== clickedColumn) {
      this.setState({
        column: clickedColumn,
        data: sortBy(data, [clickedColumn]),
        direction: 'ascending',
      })

      return
    }
    this.setState({
      data: data.reverse(),
      direction: direction === 'ascending' ? 'descending' : 'ascending',
    })
  }

  render() {

    return (
      <div>
        <Table sortable celled fixed>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell
                sorted={this.column === 'Time' ? this.direction : null}
                onClick={this.handleSort('Time')}
              >
                Time
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={this.column === 'Location' ? this.direction : null}
                onClick={this.handleSort('Location')}
              >
                LocationQR
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={this.column === 'Location' ? this.direction : null}
                onClick={this.handleSort('Location')}
              >
                Location
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={this.column === 'ProductID' ? this.direction : null}
                onClick={this.handleSort('ProductID')}
              >
                ProductQR
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={this.column === 'Location' ? this.direction : null}
                onClick={this.handleSort('Location')}
              >
                ProductID
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {map(this.props.data, ({ time, location, productId}) => (
              <Table.Row key={time}>
                <Table.Cell>{time}</Table.Cell>
            <Table.Cell>{location && <QRCode value={location}/>}</Table.Cell>
                <Table.Cell>{location}</Table.Cell>
                <Table.Cell>{productId && <QRCode value={productId}/>}</Table.Cell>
                <Table.Cell>{productId}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    )
  }
}