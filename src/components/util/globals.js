//these are tuples. JS doesnt have tuples but you can use arrays to mimic them
//MEASUREMENT: ["graphTitle", "nameInAPI", "unit"]
const degreeCelsius= "℃"
const ppm ="ppm"

const graphDataType = {
    "TEMPERATURE": ["Temperature", "temp", degreeCelsius],
    "TVOC": ['TVOC','tvoc', ppm],
    "ELECTRICAL_CONDUCTIVITY": ["Electrical Conductivity", "ec", ""],
    "CO2": ["CO2", "co2", ppm],
    "PH": ["pH", "ph", ""],
    "HUMIDITY": ["Humidity", "h", "%"],
    "WATER_TEMPERATURE": ["Water Temperature", "tempW", degreeCelsius],
    "LIGHT": ["Light", "light", "on/off"]
  }

  export {
    graphDataType
  }
