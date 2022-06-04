import React,{Component} from "react";
import {Modal, Button, Row, Col, Form} from 'react-bootstrap';

export class EditCarsModal extends Component{
    constructor(props){
        super(props);
        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleFileSelected=this.handleFileSelected.bind(this);
    }


    handleSubmit(event){
        event.preventDefault();
        fetch(process.env.REACT_APP_API+'car',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                vin:event.target.VIN.value,
                Car_Description:event.target.Car_Description.value,
                Model:event.target.Model.value,
                Brand:event.target.Brand.value,
                Color:event.target.Color.value,
                Purchase_Date:event.target.Purchasedate.value,
                Category_ID:event.target.CategoryId.value,

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
    handleFileSelected(event){
        event.preventDefault();
        this.photofilename=event.target.files[0].name;
        const formData = new FormData();
        formData.append(
            "myFile",
            event.target.files[0],
            event.target.files[0].name
        );

        fetch(process.env.REACT_APP_API+'Employee/SaveFile',{
            method:'POST',
            body:formData
        })
        .then(res=>res.json())
        .then((result)=>{
            this.imagesrc=process.env.REACT_APP_PHOTOPATH+result;
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
                    Edito Veturen
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col sm={6}>
                        <Form onSubmit={this.handleSubmit}>
                        <Form.Group controlId="VIN">
                            <Form.Label>VIN</Form.Label>
                            <Form.Control type="text" name="VIN" required
                            disabled
                            defaultValue={this.props.vin} />
                            </Form.Group>

                            <Form.Group controlId="Car_Description">
                            <Form.Label>Car Description</Form.Label>
                            <Form.Control type="text" name="Car_Description" required
                            defaultValue={this.props.cardesc}/>
                            </Form.Group> 

                            <Form.Group controlId="Model">
                            <Form.Label>Model</Form.Label>
                            <Form.Control type="text" name="Model" required
                            defaultValue={this.props.model} />
                            </Form.Group>

                            <Form.Group controlId="Brand">
                            <Form.Label>Brand</Form.Label>
                            <Form.Control type="text" name="Brand" required
                            defaultValue={this.props.brand} />
                            </Form.Group>

                            <Form.Group controlId="Color">
                            <Form.Label>Color</Form.Label>
                            <Form.Control type="text" name="Color" required
                            defaultValue={this.props.color}/>
                            </Form.Group> 

                            <Form.Group controlId="Purchasedate">
                            <Form.Label>Purchase Date</Form.Label>
                            <Form.Control type="text" name="Purchasedate" required
                            defaultValue={this.props.pdate}/>
                            </Form.Group> 

                            <Form.Group controlId="CategoryId">
                            <Form.Label>Kategoria</Form.Label>
                            <Form.Control type="text" name="CategoryId" required
                            defaultValue={this.props.category}/>
                            </Form.Group> 

                            <Form.Group>
                                <Button variant="primary" type="submit">
                                    Edito Kategorine
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