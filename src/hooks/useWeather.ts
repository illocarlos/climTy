// import apiWeather from "../api/apiWeather"

import axios from "axios"
import { searchType, Weather } from "../types/type"


function isWeatherResponse(dataWwather: unknown) {
    return (
        Boolean(dataWwather) &&
        typeof dataWwather === 'object' &&
        typeof (dataWwather as Weather).name === 'string' &&
        typeof (dataWwather as Weather).main.temp === 'number' &&
        typeof (dataWwather as Weather).main.temp_max === 'number' &&
        typeof (dataWwather as Weather).main.temp_min === 'number'
    )
}


export default function useWeather() {



    const fetchWeather = async (search: searchType) => {


        try {
            const geoURL = `http://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.country}&appid=${import.meta.env.VITE_API_KEY_CLIMA}`
            const { data } = await axios.get(geoURL)


            const Lat = data[0].lat
            const Lon = data[0].lon
            const geoWeather = `https://api.openweathermap.org/data/2.5/weather?lat=${Lat}&lon=${Lon}&appid=${import.meta.env.VITE_API_KEY_CLIMA}`
            const { data: dataWwather } = await axios.get(geoWeather)

            const result = isWeatherResponse(dataWwather)

        } catch (error) {
            console.log(error)
        }
    }
    return {
        fetchWeather
    }
}