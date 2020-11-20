import React, { Component } from 'react'
import LineChart from '../components/content/LineChart'
import { graphDataType } from '../components/util/globals'
import { getAllData } from '../components/util/supragardenAPI'



class Graph extends Component {
  state = {
    readings: []
  }

  componentDidMount() {
    
    getAllData().then((data) => this.setState({ readings: data }))
  }

  render() {
    return (
      <div className="App">
        
        <div className="chart" >
          <LineChart graphReadings={this.state.readings} parameter={graphDataType.TEMPERATURE}/>
        </div>
    </div>
    )
  }
}


export default Graph