import React, { Component } from 'react';
import InputForm from '../../components/InputForm/InputForm';
import { getTimeFromTimestamp, getWindDirection } from '../../services/utils';
import { getWeatherDataFromBackEnd } from '../../services/api-calls';
import WeatherCard from '../../components/WeatherCard/WeatherCard';
import { addCity } from '../../services/api-calls';

class SearchPage extends Component{
    state = {
        weatherData: [],
        windDirection: '',
        sunrise: '',
        sunset: ''
      }
    
      handleGetWeatherData = async formData => {
        const weatherData = await getWeatherDataFromBackEnd(formData);
        const windDirection = await getWindDirection(weatherData.wind.deg);
        const sunrise = await getTimeFromTimestamp(weatherData.sys.sunrise);
        const sunset = await getTimeFromTimestamp(weatherData.sys.sunset);
        this.props.history.push('/search');
        this.setState({weatherData, windDirection, sunrise, sunset})
      }

      handleAddCity = async () => {
          const cityObj = {};
          cityObj["name"]=this.state.weatherData.name;
          cityObj["country"]=this.state.weatherData.sys.country;
          await addCity(cityObj);
          this.props.history.push('/cities')
      }

      render(){
          return(
              <>
                <InputForm 
                    handleGetWeatherData={this.handleGetWeatherData}
                />
                {this.state.weatherData.base ?
                <>
                    <WeatherCard 
                        weatherData={this.state.weatherData}
                        windDirection={this.state.windDirection}
                        sunrise={this.state.sunrise}
                        sunset={this.state.sunset}
                        handleAddCity={this.handleAddCity}
                    />
                    <button className="btn green" onClick={() => this.handleAddCity()}>
                        Add To Favorites
                    </button>
                    
                </>    

                    :
                    <>
                    </>
                }
              </>
          )
      }
}

export default SearchPage;