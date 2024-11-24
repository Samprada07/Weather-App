import { useState } from 'react';
import { weather_api_key, weather_api_url } from './api';
import './App.css';
import Search from './components/search/search';
import CurrentWeather from './current-weather/current-weather';
import Forecast from './components/forecast/forecast';


function App() {

  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  const handleOnSearchChange = (searchData) =>{

    if (!searchData || !searchData.value) {
      console.error("Invalid search data");
      return;
    }

    const [lat, lon]=searchData.value.split(" ");
 
    if (!lat || !lon) {
      console.error("Latitude or longitude not provided correctly");
      return;
    }

    const currentWeatherFetch = fetch(`${weather_api_url}/weather?lat=${lat}&lon=${lon}&appid=${weather_api_key}&units=metric`);

    const forecastFetch = fetch(`${weather_api_url}/forecast?lat=${lat}&lon=${lon}&appid=${weather_api_key}&units=metric`);

    Promise.all([currentWeatherFetch, forecastFetch]).then(async(response)=>{
      const weatherResponse = await response[0].json();
      const forecastResponse = await response[1].json();

      setCurrentWeather({city: searchData.label, ...weatherResponse});
      setForecast({city: searchData.label, ...forecastResponse});
    }) 
    .catch((err)=> console.log(err));
  };

  console.log(currentWeather);
  console.log(forecast);

  return (
    <div className="container">
      <Search onSearchChange={handleOnSearchChange}/>
      {currentWeather && <CurrentWeather data={currentWeather}/>}
      {forecast && <Forecast data={forecast} />}
    </div>
  );
}

export default App;
