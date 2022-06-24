import React,{useEffect,useState} from "react"

const HabitApp =()=>{
  const [habit, setHabit] =useState("")
  const [frequency, setFrequency] =useState("Day")
  const [target, setTarget] =useState(1)
  const [habits, setHabits] = useState([])
  const d = new Date();
  const weekday = d.getDay();
  const today = d.getDate()

  useEffect(()=>{
    const loadHabit = localStorage.getItem("Habits")
    const loadedHabit = JSON.parse(loadHabit)

    if (loadedHabit){
      if (loadedHabit.length>0){
        loadedHabit.forEach(habit => {
          if (habit.date!==today && habit.frequency ==="Day"){
            habit.rep=0
            habit.completed=false
          }
          if (habit.date!==today && habit.frequency ==="Week" && weekday===1){
            habit.rep=0
            habit.completed=false
          }
        });
      setHabits(loadedHabit)}
    }else {
      setHabit([])
      localStorage.setItem("Habits",JSON.stringify(habits))
    }
  },[])

  useEffect(()=>{
    localStorage.setItem("Habits",JSON.stringify(habits))
  },[habits])



    const handleSubmitForm= (e)=>{
        e.preventDefault()
        if (habit.trim()){
          const newHabit = {
            id: new Date().getTime(),
            title: habit,
            frequency: frequency,
            target:target,
            completed:false,
            rep:0,
            date:today
          }
          setHabits([...habits].concat(newHabit))
        }
        setHabit("")
        setTarget(1)
      }
      const handleComplete=(id)=>{
        const updatedHabit = [...habits].map((habit)=>{
          if(habit.id ===id){
            if (habit.rep<habit.target ){
              if(habit.target-habit.rep ===1){
                habit.rep +=1
                habit.completed=true
              }else{
                habit.rep +=1
              }
          }
          }
          return habit
        })
        setHabits(updatedHabit)
      }
      const handleDelete=(id)=>{
        const updatedHabit = [...habits].filter((habit) => habit.id !== id)
        setHabits(updatedHabit)
      }
      const handleValue=(e)=>{
        if (e.target.value>=1){
          setTarget(e.target.value)
        }  
      }
    
      const toggleForm=()=>{
        if (document.getElementById("habitForm").style.display==="none"){
          document.getElementById("habitForm").style.display="block"
          document.getElementById("btnToggle").innerText="Hide add habit"
        }else{
          document.getElementById("habitForm").style.display="none"
          document.getElementById("btnToggle").innerText="Add new habit"
        }
      }
return (
<div className="habit-app">
  <h3 id="habit-heading">Habits</h3>
  <div className="daily-container">
  {habits.length===0?<h3>You have no habits added</h3>:""}
  {habits.some(habit=>habit.frequency==="Day")?<h3>Daily habit</h3>:""}

{habits.map((habit)=>
  <div key={habit.id}>
    {habit.frequency ==="Day"?
    <div className="habit-container">
    <h3 className={`habit ${habit.completed?"completed":""}`}>{habit.title}</h3>
    <p>{habit.rep}/{habit.target}</p>
    <button onClick={()=>handleComplete(habit.id)} className="btn-habit-add"><i className="fa-solid fa-plus"></i></button>
    <button onClick={()=>handleDelete(habit.id)} className="btn-habit-delete"><i className="fa-solid fa-trash-can"></i></button>
    </div>
    :""
    }
  </div>
)}
</div>
<div className="weekly-container">
{habits.some(habit=>habit.frequency==="Week")?<h3>Weekly Habit</h3>:""}

{habits.map((habit)=>
  <div key={habit.id}>
    {habit.frequency ==="Week"?
    <div className="habit-container">
      <p className={`habit ${habit.completed?"completed":""}`}>{habit.title}</p>
      <p>{habit.rep}/{habit.target}</p>
      <button onClick={()=>handleComplete(habit.id)} className="btn-habit-add"><i className="fa-solid fa-plus"></i></button>
      <button onClick={()=>handleDelete(habit.id)} className="btn-habit-delete"><i className="fa-solid fa-trash-can"></i></button>
    </div>
    :""
    }
  </div>
)}
</div>

    <form onSubmit={handleSubmitForm} id="habitForm">
      <div id="habitForm-main">
        <input type="text" value={habit} onChange={(e)=>setHabit(e.target.value)} placeholder="Enter new habit..." id="new-habit"></input>
        <div id="new-habit-detail">
          <p>target:</p>
          <input type="number" id="habit-target" value={target} onChange={(e)=>handleValue(e)}></input>
          <p>per</p>
          <select value={frequency} onChange={(e)=>setFrequency(e.target.value)}>
            <option>Day</option>
            <option>Week</option>
          </select>
          <button type="submit" id="btn-new-habit">Add Habit</button>
        </div>
      </div>
    </form>
    <button onClick={toggleForm} id="btnToggle">Hide add habit</button>
</div>
)
}

export default HabitApp