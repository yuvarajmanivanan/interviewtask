import React, { Component } from "react";
import request from "superagent";


class Mocktailinfo extends Component {
  constructor(props) {
    super(props);
    // state
    this.state = {
      mocktailinfo: [],
      value: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    request
      .get("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita")
      .then((res) => {
        console.log(res.body.drinks);
        this.setState({ mocktailinfo: res.body.drinks });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  

  handleChange(e) {
    this.setState({ value: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    request
      .get(
        "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" +
          this.state.value
      )
      .then((res) => {
        console.log(res.body.drinks);
        if(res.body.drinks === null)
        {
          this.setState({ mocktailinfo: [] });
        }
        else
        {
          this.setState({ mocktailinfo: res.body.drinks });
        }
        
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const { mocktailinfo } = this.state;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Search By mocktail Name:
            <input
              type="text"
              onChange={this.handleChange}
              value={this.state.value}
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
        <table>
          <thead>
            <tr>
              <th>Drink ID</th>
              <th>Name</th>
              <th>Tags</th>
              <th>Category</th>
            </tr>
          </thead>
          <tbody>
            {mocktailinfo.map((mocktail) => (
              <tr key={mocktail.idDrink}>
                <td>{mocktail.idDrink}</td>
                <td>{mocktail.strDrink}</td>
                <td>{mocktail.strTags}</td>
                <td>{mocktail.strCategory}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Mocktailinfo;
