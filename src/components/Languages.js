import React, { Component } from "react";
import "./Languages.css";
import people from "../data/members";

class Languages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      people: people,
      countries: [],
      isLoading: true
    };
  }

  componentDidMount() {
    fetch("https://restcountries.eu/rest/v2/lang/es")
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          countries: data,
          isLoading: false
        });
      });
  }

  getPeopleWithLanguage = () => {
    const addLanguge = (person) => ({
      name: person.name,
      country: person.country,
      languages: this.getLanguagesForCountry(person.country)
    });
    return this.state.people.map(addLanguge);
  };

  // getLanguagesForCountry = (countryName) => {
  //   const countryLang = this.state.countries.find((findCountry) => {
  //     if (findCountry.name === countryName) {
  //       return findCountry.languages;
  //     }
  //     return countryLang;
  //   });
  // };

  getLanguagesForCountry = (countryName) => {
    const findCountry = this.state.countries.find(function(element) {
      return element.name === countryName;
    });
    return findCountry.languages;
  };

  render() {
    if (this.state.isLoading) {
      return <span>Loading... </span>;
    } else {
      return (
        <div className="Languages">
          <div className="Languages-header">
            <h2>Languages Spoken in Member Countries</h2>
            <input type="text" placeholder="Search by language" />
          </div>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Country</th>
                <th>Languages</th>
              </tr>
            </thead>
            <tbody>
              {this.getPeopleWithLanguage().map((result) => {
                return (
                  <tr key={result}>
                    <td>{result.name}</td>
                    <td>{result.country}</td>
                    <td>{result.languages}</td>
                  </tr>
                );
              })}
            </tbody>
            {console.log(this.getLanguagesForCountry("sudan"))}
            <tfoot>
              <tr>
                <td colSpan="3">Total Languages: </td>
              </tr>
            </tfoot>
          </table>
        </div>
      );
    }
  }
}

export default Languages;
