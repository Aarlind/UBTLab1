import React, {Component} from 'react'
import '../style/style.css';
import {Modal, Button, Row, Col, Form} from 'react-bootstrap';

export class register extends Component {


    constructor(props){
        super(props);
        this.state={user:[]};
        this.handleSubmit=this.handleSubmit.bind(this);
        
    }
    componentDidMount(){
        fetch(process.env.REACT_APP_API+'user')
        .then(response=>response.json())
        .then(data=>{
            this.setState({cars:data});
        });
    }

    handleSubmit(event){
        event.preventDefault();
        fetch(process.env.REACT_APP_API+'user',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                Emri:event.target.Emri.value,
                Mbiemri:event.target.Mbiemri.value,
                Email:event.target.Email.value,
                Password:event.target.Password.value,
   
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
        },
        (error)=>{
            alert('Failed');
        })
    }

    render(){
  return (
    <div>
      <form onSubmit={this.handleSubmit}>
        <div className='registerForm1'>
        <p className='registerP'>Regjistrohu per llogari falas</p>
        <input name='Emri' placeholder='Emri' className='inputs1'></input>
        <input name='Mbiemri' placeholder='Mbiemri' className='inputs1'></input>
        <input name='Email' placeholder='Emaili' className='longinputs1'></input>
        <input name='Password' type="password" placeholder='Paswordi' className='longinputs1'></input>
        <p className='datapolicy'>By clicking Sign Up, you agree to our <a href='/Terms'>Terms</a>, 
        <a href='/DataPolicy'>Data Policy</a> and <a href='/Cookie Policy'>Cookie Policy</a>. You may receive SMS notifications from us and can opt out at any time.</p>
        <button className='registerbutton btn-primary'>Register</button>
        </div>
        </form>

    </div>
  )
}
}
