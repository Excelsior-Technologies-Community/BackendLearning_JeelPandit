import React,{useState,useEffect} from 'react'
import "./App.css"

const App = () => {
  const [name,setName] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [user,setUser] = useState([])

  useEffect(() => {
const savedUser = JSON.parse(localStorage.getItem("user")) || [];
setUser(savedUser);
  },[])

  useEffect (() => {
  localStorage.setItem("user" , JSON.stringify(user));
  },[user])


  const handleSubmit = (e) => {
e.preventDefault();

  if (name === "" || email === "" || password === "") {
      alert("Please fill all fields");
      return;
    }
 const newUser = {
      id: Date.now(),
      name,
      email,
      password
    };

    setUser([...user, newUser]);
    setName("");
    setEmail("");
    setPassword("");
  }

  const deleteUser = (id) => {
    const updatedUser = user.filter((user) => user.id !== id);
    setUser(updatedUser);
  } 
  return (
    <>
    <div className="container">
      <h4> Local Storage Form</h4>

      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
 <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Save</button>
      </form>

      {/* <h5>Saved Users</h5>

      {user.length === 0 ? (
        <p>No users saved yet</p>
      ) : (
        user.map((user) => (
          <div className="user-card" key={user.id}>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Password:</strong> {user.password}</p>
            <button onClick={() => deleteUser(user.id)}>Delete</button>
          </div>
        ))
      )} */}
    </div>
          <h5>Saved Users</h5>

    <div className='cards'>

      {user.length === 0 ? (
        <p>No users saved yet</p>
      ) : (
        user.map((user) => (
          <div className="user-card" key={user.id}>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Password:</strong> {user.password}</p>
            <button onClick={() => deleteUser(user.id)}>Delete</button>
          </div>
        ))
      )}
      </div>
    </>
  )
}

export default App