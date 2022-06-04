import React, {Component} from 'react'
import {Table} from 'react-bootstrap';
import {Button, ButtonToolbar} from 'react-bootstrap';
import {AddCarModal} from './AddCarModal';
import {EditCarsModal} from './EditCarsModal';
import '../style/style.css'

export class Cars extends Component {

        constructor(props){
            super(props);
            this.state={cars:[], AddModalShow:false, editModalShow:false};
        }
        refreshList(){
            fetch(process.env.REACT_APP_API+'car')
            .then(response=>response.json())
            .then(data=>{
                this.setState({cars:data});
            });
        }

            componentDidMount(){
                this.refreshList();
            }
            componentDidUpdate(){
                this.refreshList();
            }
            deleteCar(VIN){
                if(window.confirm('A jeni i sigurte?')){
                    fetch(process.env.REACT_APP_API+'car/'+VIN,{
                        method:'DELETE',
                        header:{'Accept':'application/json',
                    'Content-Type':'application/json'}
                    })
                }
            }
 render(){
     const {cars, vin, cardesc, model, brand, color, pdate, category}= this.state;
     let addModalClose=()=>this.setState({addModalShow:false});
     let editModalClose=()=>this.setState({editModalShow:false});

    return (
        <div className='mt-5 tablediv '>
            <Table className='mt-4' striped bordered hover size='sm'>
                <thead>
                    <tr> 
                    <th>VIN</th>
                    <th>Car Description</th>
                    <th>Model</th>
                    <th>Color</th>
                    <th>Brand</th>
                    <th>Purchase Date</th>
                    <th>Kategoria</th>
                    <td>Options</td>
                    
                    </tr>
                </thead>
                <tbody>
                    {cars.map(car =>
                        <tr key={car.VIN}>
                            <td>{car.VIN}</td>
                            <td>{car.Car_Description}</td>
                            <td>{car.Model}</td>                          
                            <td>{car.Color}</td>
                            <td>{car.Brand}</td>
                            <td>{car.Purchase_Date}</td>
                            <td>{car.Category_ID}</td>
                            
                            <td>
                
                <Button className="editbutton" variant="info"
    onClick={()=>this.setState({editModalShow:true,
      vin:car.VIN,cardesc:car.Car_Description, model:car.Model, brand:car.Brand, 
      color:car.Color, pdate:car.Purchase_Date, category:car.Category_ID})}>
            Edit
        </Button>

        <Button className="deletebutton" variant="danger"
        onClick={()=>this.deleteCar(car.VIN)}>
            Delete
        </Button>

        <EditCarsModal show={this.state.editModalShow}
        onHide={editModalClose}
        vin={vin}
        cardesc={cardesc}
        model={model}
        brand={brand}
        color={color}
        pdate={pdate}
        category={category}
         />
                
                            </td>
                            </tr>

                    )}
                    
                </tbody>
            </Table>

            <ButtonToolbar className='d-flex justify-content-center'>
                <Button className='shtoveture' variant='primary'
                onClick={()=>this.setState({addModalShow:true})}>
                    Shto Veture
                </Button>

            </ButtonToolbar>
            <AddCarModal show={this.state.addModalShow}
                onHide={addModalClose} />
        </div>
      )
 }

}
