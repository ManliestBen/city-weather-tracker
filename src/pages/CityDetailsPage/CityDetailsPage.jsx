import React, { Component } from 'react';
import { getWeatherDataFromBackEnd, deleteCity } from '../../services/api-calls';
import WeatherCard from '../../components/WeatherCard/WeatherCard';
import { getTimeFromTimestamp, getWindDirection } from '../../services/utils';

class CityDetailsPage extends Component{
    state = {
        name: this.props.location.state.city.name,
        country: this.props.location.state.city.country,
        weatherData: [],
        windDirection: '',
        sunrise: '',
        sunset: ''
    }
    
    async componentDidMount(){
        const weatherData = await getWeatherDataFromBackEnd(this.state)
        const windDirection = await getWindDirection(weatherData.wind.deg);
        const sunrise = await getTimeFromTimestamp(weatherData.sys.sunrise);
        const sunset = await getTimeFromTimestamp(weatherData.sys.sunset);
        this.setState({weatherData, windDirection, sunset, sunrise})
    }

    handleDeleteCity = async cityId => {
        await deleteCity(cityId)
        this.props.history.push('/cities')
    }
    

    render() {
        return(
            <>
            {this.state.weatherData.base ?
                <>
                    <WeatherCard 
                        weatherData={this.state.weatherData}
                        windDirection={this.state.windDirection}
                        sunrise={this.state.sunrise}
                        sunset={this.state.sunset}
                        handleAddCity={this.handleAddCity}
                    />
                    <button className="btn red" onClick={() => this.handleDeleteCity(this.props.match.params.id)}>
                        Remove From Favorites
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

export default CityDetailsPage;