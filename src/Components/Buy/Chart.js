import React, { Component } from 'react';                                           //  Get react
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

class Chart extends Component {
  state = {
    data: [], //  Contains data in selected period
  };

  componentDidMount() {
    this.getData();
  }

  //  Refetch whenever the selected period or company changes
  componentDidUpdate(prevProps) {
    if (
      prevProps.symbol !== this.props.symbol ||
      prevProps.startDate !== this.props.startDate ||
      prevProps.endDate !== this.props.endDate
    ) {
      this.getData();
    }
  }

  //  Get data in selected period
  getData = () => {
    fetch(`https://financialmodelingprep.com/api/v3/historical-price-full/${this.props.symbol}?from=${this.props.startDate}&to=${this.props.endDate}`)
      .then((res) => res.json())
      .then((res) => this.setState({ data: res.historical || [] }))
      .catch(() => this.setState({ data: [] }));
  };

  render() {
    return (
      <div className="chart">
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={this.state.data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <XAxis dataKey="label" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="vwap" stroke="#833ae0" fill="#B073FF" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    );
  }
}

export default Chart;
