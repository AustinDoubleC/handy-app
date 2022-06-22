import './App.css';
import React,{useEffect,useState} from "react"
import Todo from './components/Todo';
import HabitApp from './components/HabitApp.js';
import Weather from './components/Weather.js';
import WeatherToday from './components/WeatherToday.js';

function App(){

  const [todos, setTodos] = useState([])
  const [todo, setTodo] = useState("")
  const [todoEditing, setTodoEditing] = useState(null)
  const [editingText, setEditingText] = useState("")
  
  const [habit, setHabit] =useState("")
  const [frequency, setFrequency] =useState("Day")
  const [target, setTarget] =useState(1)
  const [habits, setHabits] = useState([])

  const [weather,setWeather] = useState({})
  const [tomorrow,settomorrow] = useState({})
  const [twoDays, setTwoDays] = useState({})

  useEffect(()=>{
    getWeather()
  },[])

  useEffect(()=>{
    const loadTodo = localStorage.getItem("Todos")
    const loadedTodo = JSON.parse(loadTodo)
    const loadHabit = localStorage.getItem("Habits")
    const loadedHabit = JSON.parse(loadHabit)
    if (loadedTodo){
      if (loadedTodo.length>0){
      setTodos(loadedTodo)}
    }else {
      setTodos([])
      localStorage.setItem("Todos",JSON.stringify(todos))
    }

    
    if (loadedHabit){
      if (loadedHabit.length>0){
      setHabits(loadedHabit)}
    }else {
      setHabit([])
      localStorage.setItem("Habits",JSON.stringify(habits))
    }
  },[])
  
  useEffect(()=>{
    localStorage.setItem("Todos",JSON.stringify(todos))
  },[todos])

  useEffect(()=>{
    localStorage.setItem("Habits",JSON.stringify(habits))
  },[habits])
  

    const getWeather=()=>{
        let day = new Date()
        navigator.geolocation.getCurrentPosition(position => {
          const latitude= position.coords.latitude
          const longitude = position.coords.longitude
          const key = "b89829ca087a4503b44132911222206"
          fetch(`http://api.weatherapi.com/v1/forecast.json?key=${key}&q=${latitude},${longitude}&&days=3`)
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
    <div className="app">
      <WeatherToday weather={weather}/>
      <Todo todos={todos} setTodos={setTodos} todo={todo} setTodo={setTodo} todoEditing={todoEditing} setTodoEditing={setTodoEditing} editingText={editingText} setEditingText={setEditingText}/>
      <HabitApp habit={habit} setHabit={setHabit} frequency={frequency} setFrequency={setFrequency} target={target} setTarget={setTarget} habits={habits} setHabits={setHabits}/>
    </div>
  );
        }
export default App;
