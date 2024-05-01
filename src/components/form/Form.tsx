import { countries } from '../../data/countries'
import { ChangeEvent, FormEvent, useState } from 'react'
import './Form.css'
import { searchType } from '../../types/type'
import Alert from '../Alert/Alert'


type formProp = {
  fetchWeather: (search: searchType) => Promise<void>
}

const Form = ({ fetchWeather }: formProp) => {

  const [search, setSearch] = useState<searchType>({
    city: "",
    country: ""

  })
  const [alert, setAlert] = useState('')

  const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
    setSearch({
      ...search,
      [e.target.name]: e.target.value
    })
  }
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (Object.values(search).includes("")) {
      return setAlert("There are empty fields, please fill them in.")
    }
    setAlert("")
    fetchWeather(search)
  }
  return (
    <form onSubmit={handleSubmit} className='form' action="">
      {alert && <Alert
        alertMessage={alert}
      />}
      <div className='field'>
        <label htmlFor="city">City</label>
        <input
          className='inputText'
          id='city'
          name='city'
          placeholder='write a city'
          type="text"
          value={search.city}
          onChange={handleChange} />
      </div>
      <div className='field'>
        <label htmlFor="country">country</label>
        <select
          onChange={handleChange}
          id='country'
          name='country'
          className='inputText'
          value={search.country}
        >
          <option value="">--select a country--</option>
          {countries.map(count =>
            < option
              key={count.code}
              value={count.code} > {count.name}</option>
          )}
        </select>
      </div>
      <input
        className='submit'
        type="submit" value='check weather' />
    </form >
  )
}

export default Form
