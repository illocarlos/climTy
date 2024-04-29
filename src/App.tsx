import './App.modules.css'
import Form from './components/form/Form'
import useWeather from './hooks/useWeather'

function App() {
  const { fetchWeather } = useWeather()
  return (
    <>
      <h1 className='title'>hola mundo</h1>
      <div className='container'>
        <Form
          fetchWeather={fetchWeather}
        />
        <p>2</p>
      </div>
    </>
  )
}

export default App
