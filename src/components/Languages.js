import React, { Component } from "react";
import "./Languages.css";
import people from "../data/members";

class Languages extends Component {
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

  // compareFunction = (a, b) => {
  //   const x = this.getPeopleWithLanguage().map((t) => {
  //     return t.languages.length;
  //   });
  //   return a[x] > b[x] ? 1 : -1;
  // };
  handleSearchInput = (event) => {
    console.log(event.target.value);
    this.setState({
      serchInput: event.target.value,
      isSearching: !this.state.isSearching
    });
  };

  addLanguge = (person) => ({
    name: person.name,
    country: person.country,
    languages: this.getLanguagesForCountry(person.country)
  });

  getPeopleWithLanguage = () => {
    return this.state.people.map(this.addLanguge);
  };

  getLanguagesForCountry = (countryName) => {
    const findCountry = this.props.countries.find(function(element) {
      return element.name.includes(countryName);
    });

    return findCountry.languages.map((languages) => languages.name);
  };

  getUniqueLanguageCount = () => {
    const members = this.state.people;
    const uniqueLanguages = [];
    members.forEach((e) => {
      if (!uniqueLanguages.includes(e.languages)) {
        uniqueLanguages.push(e.languages);
      }
    });
    return uniqueLanguages.length;
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
    return (
      <div className="Languages">
        <div className="Languages-header">
          <h2>Languages Spoken in Member Countries</h2>
          <input type="text" placeholder="Search by language" onChange={this.handleSearchInput} />
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
            {this.getPeopleWithLanguage()
              .filter((item) => {
                if (this.state.isSearching === false) {
                  return this.getPeopleWithLanguage();
                } else {
                  return item.languages.includes(this.state.serchInput);
                }
              })

              .map((result) => {
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
              <td colSpan="3">Total Languages:{this.getUniqueLanguages()}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    );
  }
}

export default Languages;
