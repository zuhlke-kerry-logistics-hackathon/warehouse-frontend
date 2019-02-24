import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import NavBar from "./components/NavBar";
import List from "./list/List";
import Bays from "./bay/Bays";
import SortableTable from "./components/SortableTable"

let url = "http://localhost:3000/api/warehouse-item/predictions";



class App extends React.Component {
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    this.getList();
    this.interval = setInterval(this.getList, 2000);
  }

  getList = () => {
    fetch(url)
      .then(result => {
        // Get   the result
        // If we want text, call result.text()
        return result.json();
      })
      .then(jsonResult => {
        // Do something with the result
        // console.log("jsonResult", jsonResult["result"]);
        this.setState({
          data: jsonResult['result']

        });
      });
  };

  render() {

    return (
      <BrowserRouter>
        <div className="ui container" style={{ margin: "32px 0" }}>
          <NavBar />
          <Switch>
            <Route path="/list_view" render={() =>(
                <SortableTable data={this.state.data} />
            )} />
            <Route path="/bay_view" render ={() =>(
                <Bays data={this.state.data} />
            )}/>
          </Switch>

        </div>
      </BrowserRouter>
    );
  }
}

export default App;
