const apiKey = '117c1cebe56ecdb7718f1b279aaa75d7'

export const getWeather = (coords) => {

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&units=metric&appid=`
    return fetch(url+apiKey)
    .then(res => res.json())
    .then(data => {
        return data
    })
    .catch(err => console.log(err))
}

export const getNewWeather = (newCity) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${newCity}&units=metric&appid=`
    return fetch(url+apiKey)
    .then(res => res.json())
    .then(data => {
        return data
    })
    .catch(err => {
        console.log(err)
    })
}