import React, { Component } from "react";
import people from "../data/members";
import "./Population.css";

class Population extends Component {
  constructor(props) {
    super(props);
    this.state = {
      people: people,
      countries: [],
      isLoading: true,
      searchInput: "",
      isSearching: false
    };
  }
  handleSearchInput = (event) => {
    console.log(event.target.value);
    this.setState({
      serchInput: event.target.value,
      isSearching: !this.state.isSearching
    });
  };

  addPopulation = (person) => ({
    name: person.name,
    country: person.country,
    population: this.getPopulationForCountry(person.country)
  });

  getPeopleWithPopulation = () => {
    return this.state.people.map(this.addPopulation);
  };

  getPopulationForCountry = (country) => {
    const findCountry = this.props.countries.find(function(element) {
      return element.name.includes(country);
    });
    return findCountry.population;
  };

  getUniquePopulationCount = () => {
    const uniquePopulation = [];
    people.forEach((e) => {
      if (!uniquePopulation.includes(e.country)) {
        uniquePopulation.push(e.country);
      }
    });
    return uniquePopulation.length;
  };

  render() {
    return (
      <div className="Population">
        <div className="Population-header">
          <h2>Population of Member Countries</h2>
          <input type="text" placeholder="Search by country" onChange={this.handleSearchInput} />
        </div>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Country</th>
              <th>Population</th>
            </tr>
          </thead>
          <tbody>
            {this.getPeopleWithPopulation()
              .filter((item) => {
                if (this.state.isSearching === false) {
                  return this.getPeopleWithPopulation();
                } else {
                  return item.name === this.state.searchInput;
                }
              })
              .map((result, index) => {
                return (
                  <tr key={index}>
                    <td>{result.name}</td>
                    <td>{result.country}</td>
                    <td>{result.population}</td>
                  </tr>
                );
              })}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="3">Total Population:{this.getUniquePopulationCount()}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    );
  }
}
export default Population;
