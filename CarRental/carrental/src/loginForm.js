import React,{Component, useEffect, useState} from 'react'
import { useHistory } from 'react-router-dom'


export default function LoginForm(){
    const[username, setUsername]=useState("");
    const[password, setPassword]=useState("");

    const history = useHistory();
    useEffect(() => {

        if(localStorage.getItem('user-info')){
            history.push("/home")
        }
    }, [])

async function login(){
    if(username === null && password === null){
        history.push("/");
    }
    console.warn(username, password);
    let item={username, password};
    let result = await fetch("http://localhost:5000/api/login", {
        method:'POST',
        headers:{
            "Content-Type":"application/json",
            "Accept":"application/json"
        },
        body:JSON.stringify(item)
    
    });

    result = await result.json();
    if(result == null){
        history.push("/home");
    }
    localStorage.setItem("user-info", JSON.stringify(result));
    sessionStorage.setItem("user-info", JSON.stringify(result));
    
}



    return (
        <form>
<div>
    
    <h1>Login Page</h1>
    <div className="col-sm-6 offset-sm-3">
    <input type="text" placeholder="Username" 
    onChange={(e)=>setUsername(e.target.value)}
    className="form-control" />
    <br />
    <input type="password" placeholder="password"
    onChange={(e)=>setPassword(e.target.value)}
    className="form-control" />
    <br />
    <button onClick={login} className="btn btn-primary" >Login</button>
    </div>
    </div>
    </form>
    )

}

