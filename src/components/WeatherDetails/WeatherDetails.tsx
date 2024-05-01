import { formatTempenture } from '../../helpers/formateTemp'
import { Weather } from '../../hooks/useWeather'
import './WeatherDetails.modules.css'


type WeatherDetailsProps = {
    weather: Weather,
}

export const WeatherDetails = ({ weather }: WeatherDetailsProps) => {
    return (
        <div className='container-Details'>


            <h1>  {weather.name}</h1>
            <p className='temp-now'>{formatTempenture(weather.main.temp)}&deg;C</p>
            <div className='tem-mx-mn'>
                <p>Min: <span>{formatTempenture(weather.main.temp_min)}&deg;C</span></p>
                <p>Max: <span>{formatTempenture(weather.main.temp_max)}&deg;C</span></p>
            </div>
            <div className='tem-mx-mn' >
                <p>Weather: <span>{weather.description}</span></p>
                <p>Wind: <span>{weather.wind.speed.toFixed(0)}km/h </span></p>
            </div>


        </div>
    )
}
