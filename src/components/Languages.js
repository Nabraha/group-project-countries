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
    fetch("https://restcountries.eu/rest/v2/")
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

  getLanguagesForCountry = (countryName) => {
    const findCountry = this.state.countries.find(function(element) {
      return element.name.includes(countryName);
    });

    return findCountry.languages.map((language) => language.name);
  };

  getUniqueLanguages = () => {
    const uniqueLanguages = [];
    const languagesList = this.getPeopleWithLanguage().map((item) => item.languages);
    const changeLanguageListToStr = languagesList.join(",");
    const arrayOfLanguagesList = changeLanguageListToStr.split(",");

    arrayOfLanguagesList.forEach((item) => {
      if (!uniqueLanguages.includes(item)) {
        return uniqueLanguages.push(item);
      }
    });

    return uniqueLanguages.length;
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
                  <tr key={result.name + result.country + result.languages}>
                    <td>{result.name}</td>
                    <td>{result.country}</td>
                    <td>{result.languages.join(", ")}</td>
                  </tr>
                );
              })}
            </tbody>

            <tfoot>
              <tr>
                <td colSpan="3">Total Languages: {this.getUniqueLanguages()}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      );
    }
  }
}

export default Languages;
