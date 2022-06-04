import React,{Component} from "react";
import {Modal, Button, Row, Col, Form} from 'react-bootstrap';

export class AddCarModal extends Component{
    constructor(props){
        super(props);
        this.state={cars:[]};
        this.handleSubmit=this.handleSubmit.bind(this);
        
    }
    photofilename = "anonymous.png";
    imagesrc = process.env.REACT_APP_PHOTOPATH+this.photofilename;

    componentDidMount(){
        fetch(process.env.REACT_APP_API+'carcategory')
        .then(response=>response.json())
        .then(data=>{
            this.setState({cars:data});
        });
    }

    handleSubmit(event){
        event.preventDefault();
        fetch(process.env.REACT_APP_API+'car',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                VIN:event.target.vin.value,
                Car_Description:event.target.Cardescription.value,
                Model:event.target.Model.value,
                Brand:event.target.Brand.value,
                Color:event.target.Color.value,
                Purchase_Date:event.target.Purchasedate.value,
                CategoryId:event.target.CategoryId.value
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
    return(
        <div className="container">
        <Modal 
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter" 
        centered
        
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Shto Kategorine e vetures
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col sm={6}>
                        <Form onSubmit={this.handleSubmit}>

                        <Form.Group controlId="vin">
                            <Form.Label>VIN</Form.Label>
                            <Form.Control type="text" name="vin" required                           
                            placeholder="VIN" />
                            </Form.Group>

                         <Form.Group controlId="Model">
                            <Form.Label>Model</Form.Label>
                            <Form.Control type="text" name="Model" required                           
                            placeholder="Model" />
                            </Form.Group>

                            <Form.Group controlId="Brand">
                            <Form.Label>Brand</Form.Label>
                            <Form.Control type="text" name="Brand" required />
                            </Form.Group>

                            <Form.Group controlId="Cardescription">
                            <Form.Label>Car Description</Form.Label>
                            <Form.Control type="text" name="Cardescription"  />
                            </Form.Group>


                            <Form.Group controlId="Color">
                            <Form.Label>Color</Form.Label>
                            <Form.Control type="text" name="Color" required/>
                            </Form.Group>

                            <Form.Group controlId="Purchasedate">
                            <Form.Label>Purchase Date</Form.Label>
                            <Form.Control type="text" name="Purchasedate" required/>
                            </Form.Group>

                            <Form.Group controlId="CategoryId">
                            <Form.Label>Category</Form.Label>
                            <Form.Control as="select">
                        {this.state.cars.map(car=>
                            <option key={car.Category_ID}>{car.Label}</option>)}
                        </Form.Control>
                            </Form.Group>
                            <Form.Group>
                        <Button variant="primary" type="submit">
                            Shto Veturen
                        </Button>
                    </Form.Group>
                        </Form>
                    </Col>
                </Row>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={this.props.onHide}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>

        </div>
    )
    
}
}