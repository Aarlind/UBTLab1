import React, {Component} from 'react'
import {Table} from 'react-bootstrap';
import {Button, ButtonToolbar} from 'react-bootstrap';
import {AddCarCategoryModal} from './AddCarCategoryModal';
import {EditCarCategoryModal} from './EditCarCategoryModal';
import '../style/style.css'
export class CarCategory extends Component {

        constructor(props){
            super(props);
            this.state={cars:[], addModalShow:false, editModalShow:false};
        }
        refreshList(){
            fetch(process.env.REACT_APP_API+'carcategory')
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
            deleteDep(categoryId){
                if(window.confirm('A jeni i sigurte?')){
                    fetch(process.env.REACT_APP_API+'carcategory/'+categoryId,{
                        method:'DELETE',
                        header:{'Accept':'application/json',
                    'Content-Type':'application/json'}
                    })
                }
            }
 render(){
     const {cars, categoryid, label}= this.state;
     let addModalClose=()=>this.setState({addModalShow:false});
     let editModalClose=()=>this.setState({editModalShow:false});

    return (
        <div className=''>
            <Table className='mt-4' striped bordered hover size='sm'>
                <thead>
                    <tr> 
                    <th>Category ID</th>
                    <th>Label</th>
                    <th>Options</th>
                    </tr>
                </thead>
                <tbody>
                    {cars.map(car =>
                        <tr key={car.Category_ID}>
                            <td>{car.Category_ID}</td>
                            <td>{car.Label}</td>
                            <td>
                
                <Button className="editbutton" variant="info"
    onClick={()=>this.setState({editModalShow:true,
        categoryid:car.Category_ID,label:car.Label})}>
            Edit
        </Button>

        <Button className="deletebutton" variant="danger"
        onClick={()=>this.deleteDep(car.Category_ID)}>
            Delete
        </Button>

        <EditCarCategoryModal show={this.state.editModalShow}
        onHide={editModalClose}
        category_id={categoryid}
        label={label} />
                
                            </td>
                            </tr>

                    )}
                    
                </tbody>
            </Table>


            <ButtonToolbar className='d-flex justify-content-center'>
                <Button className='shtoveture' variant='primary'
                onClick={()=>this.setState({addModalShow:true})}>
                    Shto Kategorine
                </Button>
               
            </ButtonToolbar>
            <AddCarCategoryModal show={this.state.addModalShow}
                onHide={addModalClose} />
        </div>
      )
 }

}
