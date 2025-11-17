import React, { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios';

function App() {

  const [users, setUsers] = useState([]);
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");

  const API_URL = "http://localhost:2008/person/";

  useEffect(() => {
    getAllData();
  }, []);

  async function getAllData() {
    try {
      const response = await axios.get(API_URL);
      setUsers(response.data);
    } catch (error) {
      console.error("Error mengambil data:", error);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await axios.post(API_URL, { nama, email });
      setNama("");
      setEmail("");
      getAllData();
    } catch (error) {
      console.error("Error menambah pengguna:", error);
    }
  }

  async function deleteUser(id) {
    try {
      await axios.delete(API_URL + id);
      getAllData();
    } catch (error) {
      console.error("Error menghapus pengguna:", error);
    }
  }

  return (
    <div className='wrapper'>
      <div className='header'>
        <h3>Tambah Pengguna</h3>

        <form className='input-box' onSubmit={handleSubmit}>
          <input 
            type='text' 
            placeholder='Nama'
            value={nama}
            onChange={e => setNama(e.target.value)}
            required
          />

          <input 
            type='email' 
            placeholder='Email'
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />

          <button type='submit'>Simpan</button>
        </form>
      </div>

      <div className='data-pengguna'>
        <h3>Data Pengguna</h3>

        <ul>
          {users.map((user) => (
            <li key={user.id}>
              <div>
                {user.nama} <span className='email'>({user.email})</span>
              </div>
              <div>
                <a href='#' className='edit'>Edit</a>   
                {" - "}
                <a 
                  href='#' 
                  className='delete'
                  onClick={() => deleteUser(user.id)}
                >
                  Delete
                </a>
              </div>
            </li>
          ))}
        </ul>

      </div>
    </div>
  );
}

export default App;
