import React, { useState } from 'react'
import { Line } from 'react-chartjs-2'
import { graphDataType } from '../../components/util/globals'

/**
 * 
 * @param {Array} prop.parameter ["graphTitle", "nameInAPI", "unitOfMeasurement"] 
 * @param {Array} prop.graphReadings [readings from the supragarden API] 
 */
function LineChart({graphReadings, parameter}) {
  const [graphHeader, setGraphHeader] = useState(parameter[0])
  const [dataObjName, setDataObjName] = useState(parameter[1])
  
  const takeSomeDataFromReadings = graphReadings.slice(0, 50);
  const times = takeSomeDataFromReadings.map(obj => obj.data.time.split(' ')[1].slice(0,5))
  const values= takeSomeDataFromReadings.map(obj => obj.data[`${dataObjName}`])
  
  const data={
    labels: times,
    datasets: [
      {
        label: `${graphHeader}`,
        data: [...values],
        pointHoverBackgroundColor: 'rgba(170,25,127,1)',
      },
    ]
  }

  const handleGraphDataTypeChange = () =>{
    const value = document.getElementById('graphDataType').value
    //setDataObjName(value)[1]
    setDataObjName(graphDataType[`${value}`][1])
    setGraphHeader(graphDataType[`${value}`][0])
    console.log(value)
  }

  const renderDropdownOptions = ()=> {
    const dropdownOptions = [...Object.keys(graphDataType)]
    //console.log(dropdownOptions);

    return dropdownOptions.map((option) => {
      const titleWithUnits = `${graphDataType[`${option}`][0]} ${graphDataType[`${option}`][2]}`
      return <option value={option} >{titleWithUnits}</option>
    });
  }


  return (
    <div>
      <div className="dropdown" >
        <label htmlFor="graphDataType">Select measurements </label>
        <select name="graphDataType" data-testid="search-criteria"
          id="graphDataType" onChange={handleGraphDataTypeChange}>
            {renderDropdownOptions()}
        </select>
      </div>
      <Line data={data} />
    </div>
  )
}

export default LineChart
