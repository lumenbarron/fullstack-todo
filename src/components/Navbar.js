import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { DatePicker } from "react-rainbow-components";
import { Container, Row, Col, Modal, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [openRight, setOpenRight] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [date, setDate] = useState({ date: new Date() });
  const [title, setTitle] = useState('');
  const [nameUser, setNameUser] = useState('');
  const [description, setDescription] = useState('');

  const handleClose = () => setOpenModal(false);
  const handleShow = () => setOpenModal(true);
  const addTodo = () => {
    setOpenModal(false)
    
    const date = new Date()
    let month = (date.getMonth() + 1).toString();
    let day = date.getDate();
    let year = date.getFullYear();

    if (month.length < 2) {
        month = '0' + month;
    }
    if (day.length < 2) {
        day = '0' + day;
    }
    let todoDate = day + '/' + month + '/' + year;

    console.log(nameUser, title, description, todoDate );

    const data = {
        'name' : nameUser,
  'title' : title,
'date' :todoDate,
'description' : description,
  'completed' : false
    }

        axios.post("http://localhost:5000/todo", data)
    .then(res => {
      console.log(res);
    })
    .catch(error => {
        console.log(error)
    });
  }

  return (
    <>
      <Container fluid className="main-back">
        <Row className="main-header m-0">
          <h2>Task </h2>
          <div className="main-header">
            <div className="rainbow-m-around_small pr-4">
              <DatePicker
                formatStyle="large"
                value={date.date}
                // label="DatePicker Label"
                onChange={(value) => setDate({ date: value })}
              />
            </div>
            <Button variant="base" onClick={handleShow} className="blue-text">
            <FontAwesomeIcon icon={faPlusCircle} className="rainbow-m-right_medium mr-2 blue-text" />
              Add task
            </Button>
          </div>
        </Row>
      </Container>
      <Modal
        show={openModal}
        onHide={handleClose}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>New task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
          <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="name" value={nameUser} onChange={e => setNameUser(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control type="title" value={title} onChange={e => setTitle(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" value={description} rows={3} onChange={e => setDescription(e.target.value)} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={addTodo}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Navbar;
