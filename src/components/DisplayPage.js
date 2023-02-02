import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AiFillDelete } from "react-icons/ai"
import "./formPage.css"
function DisplayPage() {
  let [data, setData] = useState([]);
  let navigate = useNavigate()

  const getData = () => {
    axios.get(`https://stack-fusion-backend-22w7.onrender.com/user`).
      then((data) => {
        console.log(data.data.data);
        setData(data.data.data)
      })
  };

  useEffect(() => {
    getData()
  }, []);

  function handleDelete(_id) {
    axios
      .delete(`https://stack-fusion-backend-22w7.onrender.com/user/${_id}`)
      .then(() => {
        getData()
      });
  }
  return (
    <div id='main-container'>
      <button id='back-btn' onClick={() => {
        navigate(-1)
      }}>Back</button>
      <div id='container'>


        <h2>Users List</h2>
        <hr />

        <table>
          <thead>
            <tr className='' key={data._id}>
              <th>User Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Date of birth</th>
              <th>Delete User</th>
            </tr>
          </thead>
          <tbody>
            {data.map((data, index) => {
              return <tr className='' key={data._id}>

                <td>{data.name}</td>
                <td>{data.email}</td>
                <td>{data.mobile}</td>
                <td>{data.DOB}</td>
                <td>
                  <button className='icon ' onClick={() => { handleDelete(data._id) }}><AiFillDelete /></button>
                </td>

              </tr>
            })}
          </tbody>


        </table>
      </div>

    </div>
  )
}

export default DisplayPage