import React, { useEffect, useState } from 'react'
import Home from './components/home';
import {GlobalStyles} from './globalStyles'
import ClimaComponent from './components/ClimaComponent'
import {getWeather, getNewWeather} from './services/getWeather'
import {getExtended, getNewExtended} from './services/getExtended'
import SearchComponent from './components/searchComponent'
import Loading from './components/loading'

function App() {

  const [loading, setLoading] = useState(true)
  const [coords, setCoords] = useState()
  const [clima, setClima] = useState()
  const [extended, setExtended] = useState()
  const [search, setSearch] = useState('')
  const [placeholder, setPlaceholder] = useState('Busca una ciudad')

  const [isDesktop, setDesktop] = useState(window.innerWidth > 800)

    const updateMedia = () => {
      setDesktop(window.innerWidth > 800)
  }
  
  useEffect(() => {
      window.addEventListener("resize", updateMedia)
      return () => window.removeEventListener("resize", updateMedia)
  })


  let onSuccess = function(position) {
    let lon = position.coords.longitude
    let lat = position.coords.latitude
    setCoords({lat: lat.toFixed(2), lon: lon.toFixed(2)})
  }

  function onError(error) {
    console.log(error.code + error.message)
    setCoords({lat: -34.61, lon: -58.37})
  }

  const handleNewCity = () => {
    setPlaceholder('Busca una ciudad')
    setLoading(true)
    getNewWeather(search)
    .then(data => {
      if (data.message === 'city not found'){
        setPlaceholder('No se encontraron resultados, intente nuevamente')
      } else {
        setClima(data)
      }
    })
    .then(() => {
      getNewExtended(search)
      .then(res => {
        if (res.message === 'city not found'){
          setPlaceholder('No se encontraron resultados, intente nuevamente')
        } else {
          setExtended(res)
        }
        setLoading(false)
      })
    })
    .catch(err => {
      console.log(err)
      setPlaceholder('No se encontraron resultados, intente nuevamente')
    })
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  }, [])

  useEffect(() => {
    if (coords !== undefined) {
      getWeather(coords)
      .then(data => {
        setClima(data)
      })
      .then(() => {
        getExtended(coords)
        .then(res => {
          setExtended(res)
          setLoading(false)
        })
      })
      .catch(err => console.log(err))
    }
  }, [coords])

  if (loading) {
    return <Loading />
  } else
    return (
      <div>
          <GlobalStyles />
          <Home clima={clima} isDesktop={isDesktop} />
          <ClimaComponent clima={clima} extended={extended} />
          <SearchComponent setSearch={setSearch} handleNewCity={handleNewCity} placeholder={placeholder} />
      </div>
    )
}

export default App
