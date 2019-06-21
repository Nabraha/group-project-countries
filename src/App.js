import React, { Component } from "react";
import Statistics from "./components/Statistics";
import Languages from "./components/Languages";
import Population from "./components/Population";
import members from "./data/members";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      members: members,
      countries: [],
      isLoading: true
    };
  }

  componentDidMount() {
    fetch("https://restcountries.eu/rest/v2")
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          countries: data,
          isLoading: false
        });
      });
  }

  getUniqueRegionsCount = () => {
    const addRegion = (member) => {
      return {
        name: member.name,
        country: member.country,
        region: this.getRegionForCountry(member.country)
      };
    };
    const membersWithRegins = this.state.members.map(addRegion);
    const uniqueRegins = [];
    membersWithRegins.forEach((e) => {
      if (!uniqueRegins.includes(e.region)) {
        uniqueRegins.push(e.region);
      }
    });

    return uniqueRegins.length;
  };

  getRegionForCountry = (countryName) => {
    let country = this.state.countries.find((findCountry) => {
      return findCountry.name.includes(countryName);
    });
    return country.region;
  };

  getUniqueCountriesCount = () => {
    const uniqueCountries = [];
    members.forEach((e) => {
      if (!uniqueCountries.includes(e.country)) {
        uniqueCountries.push(e.country);
      }
    });
    return uniqueCountries.length;
  };

  render() {
    if (this.state.isLoading) {
      return <span>Loading... </span>;
    }
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Community Member Countries</h1>
        </header>
        <Statistics
          totalMembers={members.length}
          totalCountries={this.getUniqueCountriesCount()}
          totalRegins={this.getUniqueRegionsCount()}
        />
        <Population countries={this.state.countries} />
        <Languages countries={this.state.countries} />
      </div>
    );
  }
}

export default App;
