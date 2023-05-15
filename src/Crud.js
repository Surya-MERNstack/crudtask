import React, { useState } from "react";
import './Crud.css'
import { ExclamationOctagonFill, PencilSquare, Trash3Fill } from "react-bootstrap-icons";


function Crud () {
  const [data ,setData] = useState([]);

  const [formdata , setFormdata] = useState({
    id : "",
    name : "",
    age : "",
    email : "",
    city : ""
  });
  const [editMode , setEditMode] = useState();
  const [editindex ,setEditIndex] = useState();
  const [formerror ,setFormerror] = useState("")
  const changehandler = (e) => {
    const {name ,value} = e.target
    setFormdata({
     ...formdata ,[name] : value
    })
  }

  const formhandler = (e) => {
    e.preventDefault();
    if(!formdata.name || !formdata.age || !formdata.city){
      setFormerror("Please Fill the form!")
      return;
    }
     if(editMode) {
      setData(
        data.map((items ,dataindex) => {
           if(dataindex === editindex) {
            return {...data , ...formdata}
           }
           return items
        })
      )
      setEditIndex(null)
      setEditMode(false)
     }else{
       setData([...data, {...formdata , id : data.length + 1}])
     }
     setFormdata({name : "" , age : "" ,email : "" ,city : ""})
      setFormerror("")
  }

  const edithandler = (index) =>{
   setFormdata(data[index])
   setEditMode(true)
   setEditIndex(index)
  }

  const delethandler = (index) => {
    setData(
      data.filter((items,indexs) => indexs !== index)
    )
  }
  return(
    <>
    <h1><u>Registration Form</u></h1>
    <form onSubmit={formhandler}>
      <label>Username</label>
      <input 
      type="text" 
      name="name"
      placeholder="username"
      value={formdata.name}
      onChange={changehandler}
      /><br/>
      <label>Age</label>
      <input 
      type="number"
      placeholder="age"
      name="age"
      value={formdata.age}
      onChange={changehandler} 
      /><br/>
      <label>Email</label>
        <input 
      type="email"
      placeholder="@gmail.com"
      name="email"
      value={formdata.email}
      onChange={changehandler} 
      /><br/>
      <label>City</label>
      <input 
      type="text"
      name="city"
      placeholder="city"
      value={formdata.city}
      onChange={changehandler}
      />
      <button style={{backgroundColor: editMode ? 'rgb(20, 223, 20)' : 'red'}}>
  {editMode ? "Save" : "Add"}
</button>
      <p>{formerror && <div style={{ color: "red" }}><ExclamationOctagonFill/> {formerror}</div>}
</p>
    </form>
    <br/>
    <h2>Details</h2>
    <table>
      <thead>
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>Age</th>
          <th>Email</th>
          <th>City</th>
          <th>Customize</th>
        </tr>
       </thead>
       <tbody>
            {
              data.map((items , index) => (
              <tr key={items.id}>
                <td>{items.id}</td>
                <td>{items.name}</td>
                <td>{items.age}</td>
                <td>{items.email}</td>
                <td>{items.city}</td>
                <td><button onClick={() => edithandler(index)}  className="btn-edit"><PencilSquare/></button>
                <button onClick={() => delethandler(index)} className="btn-trash"><Trash3Fill/></button></td>
              </tr>
             ))}
        </tbody>
     </table>
    </>
  )
}

export  default Crud;
