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
      countries: []
    };
  }

  getUniqueCountriesCount = () => {
    const uniqueCountries = [];
    members.forEach((e) => {
      if (!uniqueCountries.includes(e.country)) {
        uniqueCountries.push(e.country);
      }
    });
    return uniqueCountries.length;
  };

  // addRegion = (member) => {
  //   return {
  //     name: member.name,
  //     country: member.country,
  //     region: this.state.countries.find((findCountry) => {
  //       console.log(findCountry.name);
  //       console.log(member.country);
  //       if (findCountry.name === member.country) {
  //         console.log(findCountry.region);
  //       }
  //     })
  //   };
  // };

  addMember = () => {
    const x = members.map((el) => {
      return {
        name: el.name,
        country: el.country,
        region: this.getRegionForCountry(el.country)
        // this.state.countries.find((findCountry) => {
        // if (findCountry.name === el.country) {
        //   console.log(findCountry.region);
        // }

        //return findCountry.region;
      };
    });
    //   };
    // });
    console.log(x);
  };

  // getUniqueRegionsCount = () => {
  //   const membersWithRegion = members.map(this.addRegion);
  //   console.log(membersWithRegion);
  // };

  getRegionForCountry = (countryName) => {
    this.state.countries.filter((findCountry) => {
      if (findCountry.name === countryName) {
        console.log(findCountry.region);
      }
    });
  };

  componentDidMount() {
    fetch("https://restcountries.eu/rest/v2/all")
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          countries: data
        });
      });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Community Member Countries</h1>
        </header>
        <Statistics
          totalMembers={members.length}
          totalCountries={this.getUniqueCountriesCount()}
          totalR={this.getRegionForCountry("Sudan")}
        />
        {console.log(this.addMember())}
        <Population />
        <Languages />
      </div>
    );
  }
}

export default App;
