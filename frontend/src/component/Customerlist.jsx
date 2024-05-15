import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';



function Customerlist() {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8081/customer')
            .then(res => setStudents(res.data))
            .catch(err => console.error(err));
    }, []);

    return (    
            
            <div className='col-md-9 bg-dark bg-opacity-100   d-flex justify-content-center align-items-center'>
              <div className='w-200 h-90 bg-white rounded p-4'>
                <table className='table'>
                
                  <thead>
                    <tr>
                      <th>Student_ID</th>
                      <th>name</th>
                      <th>contact</th>
                      <th>address</th>
                      <th>email</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((student, index) => (
                      <tr key={index}>
                        <td>{student.Student_ID}</td>
                        <td>{student.name}</td>
                        <td>{student.contact}</td>
                        <td>{student.address}</td>
                        <td>{student.email}</td>
                        <td> <button class="edit-btn">Edit</button></td>
                        <td></td><button class="delete-btn">Delete</button><td>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      );
    }

export default Customerlist;
