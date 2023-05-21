import React, { useState } from "react";
import { ExclamationOctagonFill, PencilSquare, Trash3Fill } from "react-bootstrap-icons";
import './Crud.css';

const  Crud = () => {
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    age: "",
    email: "",
    city: ""
  });
  const [editMode, setEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [formError, setFormError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.age || !formData.city) {
      setFormError("Please fill in all fields.");
      return;
    }
    if (editMode) {
      setData((prevData) =>
        prevData.map((item, index) =>
          index === editIndex ? { ...item, ...formData } : item
        )
      );
      setEditIndex(null);
      setEditMode(false);
    } else {
      setData((prevData) => [...prevData, { ...formData, id: prevData.length + 1 }]);
    }
    setFormData({
      id: "",
      name: "",
      age: "",
      email: "",
      city: ""
    });
    setFormError("");
  };

  const handleEdit = (index) => {
    setFormData(data[index]);
    setEditMode(true);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    setData((prevData) => prevData.filter((_, i) => i !== index));
  };

  return (
    <>
      <h1 style={{ textAlign: "center", color: "rgb(255, 152, 111)" }}>
        <u>Registration Form</u>
      </h1>
      <div class="crud-form animate">
      <div className="crud-container">
    
        <form className="crud-form" onSubmit={handleSubmit}>
          <label>Username</label>
          <input
            type="text"
            name="name"
            placeholder="Username"
            value={formData.name}
            title="Username"
            onChange={handleChange}
          />
          <br />
          <label>Age</label>
          <input
            type="number"
            placeholder="Age"
            name="age"
            title="Age"
            value={formData.age}
            onChange={handleChange}
          />
          <br />
          <label>Email</label>
          <input
            type="email"
            title="Email"
            placeholder="@gmail.com"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <br />
          <label>City</label>
          <input
            type="text"
            name="city"
            title="City"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
          />
          <button
            className={`btn-${editMode ? 'edit' : 'add'}`}
            style={{
              backgroundColor: editMode ? "rgb(20, 223, 20)" : "",
              cursor: "pointer"
            }}
          >
            {editMode ? "Save" : "Add"}
          </button>
          {formError && (
            <p style={{ color: "red" }}>
              <ExclamationOctagonFill /> {formError}
            </p>
          )}
        </form>
        <div className="crud-table">
          <h2 style={{ textAlign: "center", color: "rgb(255, 152, 111)" }}>Details</h2>
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
              {data.map((item, index) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.age}</td>
                  <td>{item.email}</td>
                  <td>{item.city}</td>
                  <td>
                    <button
                      onClick={() => handleEdit(index)}
                      className="btn-edit"
                      title="Edit"
                    >
                      <PencilSquare />
                    </button>
                    <button
                      onClick={() => handleDelete(index)}
                      className="btn-trash"
                      title="Delete"
                    >
                      <Trash3Fill />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default Crud;