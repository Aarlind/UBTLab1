import React,{Component} from "react";
import {Modal, Button, Row, Col, Form} from 'react-bootstrap';

export class EditCarCategoryModal extends Component{
    constructor(props){
        super(props);
        this.handleSubmit=this.handleSubmit.bind(this);
    }
    handleSubmit(event){
        event.preventDefault();
        fetch(process.env.REACT_APP_API+'carcategory',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                Category_ID:event.target.CategoryId.value,
                Label:event.target.label.value
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
                    Edito Kategorine e vetures
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col sm={6}>
                        <Form onSubmit={this.handleSubmit}>
                        <Form.Group controlId="CategoryId">
                            <Form.Label>Category ID</Form.Label>
                            <Form.Control type="text" name="CategoryId" required
                            disabled
                            defaultValue={this.props.category_id}
                            placeholder="Label" />
                            </Form.Group>

                            <Form.Group controlId="label">
                            <Form.Label>Label</Form.Label>
                            <Form.Control type="text" name="label" required
                            defaultValue={this.props.label}
                            placeholder="Label" />
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