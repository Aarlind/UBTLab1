import React, {Component} from 'react'
import '../style/style.css';

export class Home extends Component {
 render(){
    return (
      <div className='MainPage'>
      <div className='marketingdiv'>
      <div className='pdiv'>
        <p>
          Make your drive best <br></br>
          is our responnsibility
        </p>
      </div>
  
      <button className='rentbutton'>Rent Now</button>
      </div>
      <div className='anotherdiv'>

        <div className='sloganDiv'>
          <p>
            The largest rental for car
            <br></br> enthusiast.
          </p>
        </div>
      <form>
        <div className='registerForm'>
        <p className='registerP'>Regjistrohu per llogari falas</p>
        <input placeholder='Emri' className='inputs'></input>
        <input placeholder='Mbiemri' className='inputs'></input>
        <input placeholder='Emaili' className='longinputs'></input>
        <input placeholder='Paswordi' className='longinputs'></input>
        <button className='registerbutton btn-primary'>Register</button>
        </div>
        </form>
      </div>
      </div>
  
      )
 }

}
