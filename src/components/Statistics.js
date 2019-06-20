import React, { Component } from "react";
import Statistic from "./Statistic";
import "./Statistics.css";

class Statistics extends Component {
  render() {
    const total = this.props.totalMembers;

    return (
      <div className="Statistics">
        <Statistic label="Total Members" total={total} />
        <Statistic label="Total Countries" total={this.props.totalCountries} />
        <Statistic label="Total Regions" total />
      </div>
    );
  }
}

export default Statistics;
