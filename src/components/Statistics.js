import React, { Component } from "react";
import Statistic from "./Statistic";
import "./Statistics.css";

class Statistics extends Component {
  render() {
    const totalMember = this.props.totalMembers;
    const totalCountries = this.props.totalCountries;
    const countriesTotalRegions = this.props.totalRegins;

    return (
      <div className="Statistics">
        <Statistic label="Total Members" total={totalMember} />
        <Statistic label="Total Countries" total={totalCountries} />
        <Statistic label="Total Regions" total={countriesTotalRegions} />
      </div>
    );
  }
}

export default Statistics;
