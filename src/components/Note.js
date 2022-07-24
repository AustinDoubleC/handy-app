import React,{useEffect,useState} from "react"

const Note =()=>{
  const [notes, setNotes] = useState([])
  const [note, setNote] = useState("")
  const [noteEditing, setNoteEditing] = useState(null)
  const [editingNote, setEditingNote] = useState("")
  
  useEffect(()=>{
    const loadNote = localStorage.getItem("Notes")
    const loadedNote = JSON.parse(loadNote)

    if (loadedNote){
      if (loadedNote.length>0){
      setNotes(loadedNote)}
    }else {
      setNotes([])
      localStorage.setItem("Notes",JSON.stringify(notes))
    }
  },[])

  useEffect(()=>{
    localStorage.setItem("Notes",JSON.stringify(notes))
  },[notes])

  
  const noteLimit = 200;
    const handleSubmit=(e)=>{
        e.preventDefault()
        if (note.trim()){
            const newNote = {
            id: new Date().getTime(),
            text: note
          }
          setNotes([...notes].concat(newNote))
          setNote("")
        } 
      }
    
      const deleteNote =(id)=>{
        const updatedNotes = [...notes].filter((note) => note.id !== id)
        setNotes(updatedNotes)
      }

      const editNote = (id) =>{
        if (editingNote.trim()){
        const updatedNotes = [...notes].map((note) =>{
          if(note.id===id) {
                note.text = editingNote
          }
          return note
        })
        setNotes(updatedNotes)
        setNoteEditing(null)
        setEditingNote("")}
      }
   

return(
<div className="note-app">
    <h2>My notes</h2>
    <form onSubmit={handleSubmit} id="noteForm">
        <textarea id="add-new-note" placeholder="Enter new note here..." onChange={(e)=>{
          if (noteLimit-e.target.value.length>=0)
          {setNote(e.target.value)
          }}} value={note}/>
        <div id="noteFormBottom">
          <small id="noteRemain">{noteLimit-note.length} characters remaining </small>
          <button type="submit" id="btn-new-note">Add Note</button>
        </div>
        
      </form>
      <h3>Note-list</h3>
      {notes.map((note)=>
      <div key={note.id}>
        {noteEditing ===note.id ?
          (
          <div id="note-edit-container">
          <textarea
          type="text" 
          onChange = {(e)=>{setEditingNote(e.target.value)}} 
          value = {editingNote}
          placeholder = {`(ctrl+v to paste original note)`}
          id="note-edit-area"
          />
          <div id="note-edit-bottom">
          <small id="editNoteRemain">{noteLimit-editingNote.length} characters remaining </small>
          <button onClick={()=>setNoteEditing(null)} id="btn-edit-cancel">Cancel</button>
          <button onClick={()=>editNote(note.id)} id="btn-edit-note">Save</button>
          </div>
          
          </div>
          )
          :
          (<div id="note-item-container">
            <p id="note-item">{note.text}</p>
              <div id="note-item-bottom">
                <button onClick={()=>deleteNote(note.id)} id="btn-note-delete"><i className="fa-solid fa-trash-can"></i></button>
                <button onClick={()=>{
                  setNoteEditing(note.id)
                  setEditingNote(note.text)
                }} id="btn-note-edit"><i className="fa-solid fa-pen-to-square"></i></button>
            </div>
          </div>)}

      </div>)}
      
    </div>
)
}

export default Note