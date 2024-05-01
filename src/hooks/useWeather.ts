// import apiWeather from "../api/apiWeather"

import axios from "axios"
import { searchType } from "../types/type"
import { object, string, number, Output, parse } from 'valibot'
import { useMemo, useState } from "react"
// modo type guard
// function isWeatherResponse(dataWwather: unknown):weather is Weather {
//     return (
//         Boolean(dataWwather) &&
//         typeof dataWwather === 'object' &&
//         typeof (dataWwather as Weather).name === 'string' &&
//         typeof (dataWwather as Weather).main.temp === 'number' &&
//         typeof (dataWwather as Weather).main.temp_max === 'number' &&
//         typeof (dataWwather as Weather).main.temp_min === 'number'
//     )
// }


// Modo ZOD(libreria)--> esta es una buena alternativa en comparacion con typeguard y asignar type
// import { z } from "zod"
// const Weather = z.object({
//     name: z.string(),

//     main: z.object({
//         temp: z.number(),
//         temp_max: z.number(),
//         temp_min: z.number(),

//     })
// })

// type Weather = z.infer<typeof Weather>



// Modo  Volibot(libreria)--> esta es una buena alternativa en comparacion con typeguard y asignar type
const WeatherSchema = object({
    name: string(),

    main: object({
        temp: number(),
        temp_max: number(),
        temp_min: number(),

    }),
    description: string(),
    wind: object({
        speed: number(),
    })
})

export type Weather = Output<typeof WeatherSchema>



const resetWeather = {
    name: '',
    main: {
        temp: 0,
        temp_max: 0,
        temp_min: 0
    },
    description: '',
    wind: {
        speed: 0,
    }
}

export default function useWeather() {


    const [weather, setWeather] = useState<Weather>(resetWeather)
    const [loading, setLoading] = useState(false)
    const [notFound, setNotFound] = useState(false)

    const fetchWeather = async (search: searchType) => {

        setNotFound(false)
        setLoading(true)
        setWeather(resetWeather)
        try {
            const geoURL = `http://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.country}&appid=${import.meta.env.VITE_API_KEY_CLIMA}`
            const { data } = await axios.get(geoURL)


            if (!data[0]) {
                return setNotFound(true)
            }

            const Lat = data[0].lat
            const Lon = data[0].lon


            const geoWeather = `https://api.openweathermap.org/data/2.5/weather?lat=${Lat}&lon=${Lon}&appid=${import.meta.env.VITE_API_KEY_CLIMA}`





            //modo AsignarTYPE
            //traemkos de un idex.type lo que nos vendra de la api o sabemos lo que llegara es una forma poco aconsejable
            //por que la informacion de las api es muy grande y pueden cambiar con el timepo su informacion
            // const { data: dataWwather } = await axios.get<Weather>(geoWeather)



            //modo type GUARD forma de typar informacion que llega de una api
            //aqui mandamos la respuesta de la api a una funcion y ahi la tipamos
            // const { data: dataWwather } = await axios.get(geoWeather)
            // const result = isWeatherResponse(dataWwather)
            // result ? dataWwather : console.log('respuesta mal formada')


            // Modo ZOD(libreria)--> esta es una buena alternativa en comparacion con typeguard y asignar type
            // const { data: dataWwather } = await axios.get(geoWeather)
            // const result = Weather.safeParse(dataWwather)
            //  result ? dataWwather : console.log('respuesta mal formada')

            // Modo  Volibot(libreria)--> esta es una buena alternativa en comparacion con typeguard y asignar type
            const { data: dataWather } = await axios.get(geoWeather)

            const description = dataWather.weather[0].description
            const dataWwather = {
                ...dataWather,
                description: description
            }

            const result = parse(WeatherSchema, dataWwather);

            result ? setWeather(result) : console.log('error')

        } catch (error) {

            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const hasWeatherData = useMemo(() => weather.name, [weather])

    return {
        weather,
        loading,
        notFound,
        fetchWeather,
        hasWeatherData
    }
}