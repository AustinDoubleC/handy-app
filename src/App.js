import './App.css';
import React,{useEffect,useState} from "react"
import Todo from './components/Todo';
import HabitApp from './components/HabitApp.js';
import Weather from './components/Weather.js';
import WeatherToday from './components/WeatherToday.js';
import Nav from "./components/Nav"
import Note from './components/Note';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

function App(){
  const [weather,setWeather] = useState({})
  const [tomorrow,settomorrow] = useState({})
  const [twoDays, setTwoDays] = useState({})

  useEffect(()=>{
    getWeather()
  },[])

    const getWeather=()=>{
        let day = new Date()
        navigator.geolocation.getCurrentPosition(position => {
          const latitude= position.coords.latitude
          const longitude = position.coords.longitude
          const key = "b89829ca087a4503b44132911222206"
          fetch(`https://api.weatherapi.com/v1/forecast.json?key=${key}&q=${latitude},${longitude}&&days=3`)
          .then(res => {
            if (!res.ok) {
                throw Error("Weather data not available")
            }
            return res.json()
        })
        .then(data => {
          setWeather({
            iconUrl:data.current.condition.icon,
            temp:data.current.temp_c,
            max:Math.round(data.forecast.forecastday[0].day.maxtemp_c),
            min:Math.round(data.forecast.forecastday[0].day.mintemp_c),
            city:data.location.name,
            date:day.getDate()+"/"+(day.getMonth()+1)  
        })
          settomorrow({
            date:(day.getDate()+1)+"/"+(day.getMonth()+1),
            iconUrl:data.forecast.forecastday[1].day.condition.icon,
            max:Math.round(data.forecast.forecastday[1].day.maxtemp_c),
            min:Math.round(data.forecast.forecastday[1].day.mintemp_c),
        })
          setTwoDays({
            date:(day.getDate()+2)+"/"+(day.getMonth()+1),
            iconUrl:data.forecast.forecastday[2].day.condition.icon,
            max:Math.round(data.forecast.forecastday[2].day.maxtemp_c),
            min:Math.round(data.forecast.forecastday[2].day.mintemp_c),
        })
        
        })
        .catch(err => console.error(err))
      });
      }
    
  return (
    <Router>
    <div className="app">
      <div className='route-container'>
      <Nav />
      <Routes>
        <Route path="/handy-app" exact element={<div><WeatherToday weather={weather}/><Todo /><HabitApp/></div>}/>
        <Route path="/handy-app/weather" element={<Weather weather={weather} tomorrow={tomorrow} twoDays={twoDays}/>}/>
        <Route path="/handy-app/note" element={<Note />}/>
      </Routes>
      </div>
    </div>
    </Router>
  );
        }
export default App;
