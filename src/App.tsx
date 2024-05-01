import './App.css'
import Alert from './components/Alert/Alert.tsx'
import Form from './components/Form/Form.tsx'
import Spiner from './components/Spiner/Spiner.tsx'
import { WeatherDetails } from './components/WeatherDetails/WeatherDetails'
import useWeather from './hooks/useWeather'

function App() {
  const { fetchWeather, weather, hasWeatherData, loading, notFound } = useWeather()
  return (
    <>
      <h1 className='title'>search weather</h1>
      <div className='container'>
        <Form
          fetchWeather={fetchWeather}
        />

        <div className='container-Details-loader'>

          {loading && <Spiner />}
          {hasWeatherData &&
            <WeatherDetails
              weather={weather}
            />
          }
          {notFound && <Alert
            alertMessage='City not found'
          />}
        </div>


      </div>
    </>
  )
}

export default App
