import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Drawer, Button, Select, Badge } from "react-rainbow-components";
import { Table, Form } from "react-bootstrap";

export default function ALLTodo() {
  const [todos, setTodos] = useState();
  const [ready, setReady] = useState(false);
  const [openRight, setOpenRight] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [title, setTitle] = useState("");
  const [nameUser, setNameUser] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState("");
  const eachTodo = useRef("");

  const options = [
    { value: false , label: 'Pending' },
    { value: true, label: 'Completed' },
];

  useEffect(() => {
    axios
      .get("http://localhost:5000/todo")
      .then((res) => {
        //console.log(res.data);
        setTodos(res.data);
        setReady(true);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [todos]);

  const selecTodo = (id) => {
    setOpenRight(true);
    // eachId.current = id;
    console.log(id);
    axios
      .get("http://localhost:5000/todo/" + id)
      .then((res) => {
        console.log(res.data);
        eachTodo.current = res.data;
        setTitle(res.data.title);
        setNameUser(res.data.name);
        setDescription(res.data.description);
        setCompleted(res.data.completed);
        //console.log(res.data)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteTodo = (id) => {
    console.log(id);
    axios
      .delete(`http://localhost:5000/todo/${id}`)
      .then((res) => {
        console.log(res);
        setOpenRight(false);
        alert("se ha borrado con exito");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const editDrawer = () => {
    setOpenRight(false);
    setOpenEdit(true);
    console.log("editando");
  };

  const editTodo = (id) => {
    console.log(title,nameUser, description,completed  );
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

    const newData = {
        'title': title,
        'name'  : nameUser,
        'date': todoDate,
        'description': description,
        'completed': completed,
    };
    axios
      .patch(`http://localhost:5000/todo/${id}`, newData)
      .then((res) => {
        console.log(res);
        setOpenEdit(false)
        alert("updating");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="all-todos">
      <Table striped bordered hover variant="light">
        <thead>
          <tr>
            <th>Status</th>
            <th>Title</th>
            <th>Created</th>
            <th>Description</th>
          </tr>
        </thead>
        {ready ? (
          todos.map((item) => (
            <tbody key={item._id}>
              <tr>
                <td>
                    {item.completed ? (        <Badge
            className="rainbow-m-around_medium"
            label="Completed"
            variant="success"
        />) : (         <Badge
            className="rainbow-m-around_medium"
            label="Pending"
            variant="warning"
        />) }
                  
                </td>
                <td>
                  <Button variant="base" onClick={() => selecTodo(item._id)}>
                    {item.title}
                  </Button>
                </td>
                <td>{item.date}</td>
                <td>{item.description}</td>
              </tr>
            </tbody>
          ))
        ) : (
          <h1 className="">Loading...</h1>
        )}
      </Table>
      {openRight && (
        <Drawer
          slideFrom="right"
          footer={
            <DrawerFooter
              onDelete={() => deleteTodo(eachTodo.current._id)}
              onEdit={() => editDrawer()}
            />
          }
          isOpen={openRight}
          onRequestClose={() => setOpenRight(false)}
        >
          <h1 className="gray-each-todo mb-5">{eachTodo.current.title}</h1>
          <h2 className="header-each-todo mb-3">Status</h2>
          <p className="mb-3">
            {eachTodo.current.completed ? "Completed" : "Pending"}
          </p>
          <h2 className="header-each-todo">Created</h2>
          <p className="mb-3">{eachTodo.current.date}</p>
          <h2 className="header-each-todo">Description</h2>
          <p className="mb-3">{eachTodo.current.description}</p>

          <p className="gray-each-todo">Made by {eachTodo.current.name}</p>
        </Drawer>
      )}

      {openEdit && (
        <Drawer
          slideFrom="right"
          footer={
            <DrawerEditFooter
              onSave={() => editTodo(eachTodo.current._id)}
              onCancel={() => setOpenEdit(false)}
            />
          }
          isOpen={openEdit}
          onRequestClose={() => setOpenEdit(false)}
        >
          <Form>
            <Form.Group controlId="formTtile">
              <h1 className="gray-each-todo mb-5">Title</h1>
              <Form.Control
                type="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formComplete">
              <h2 className="header-each-todo mb-3">Status</h2>
              <Select
                options={options}
                value={completed}
                onChange={(ev) => setCompleted(ev.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formDescriptionEdit">
              <h2 className="header-each-todo">Description</h2>
              <Form.Control
                as="textarea"
                value={description}
                rows={3}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
          </Form>
          <Form.Group controlId="formNameEdit">
            <p className="gray-each-todo">Made by</p>
            <Form.Control
              type="name"
              value={nameUser}
              onChange={(e) => setNameUser(e.target.value)}
            />
          </Form.Group>
        </Drawer>
      )}
    </div>
  );
}

function DrawerFooter({ onDelete, onEdit }) {
  return (
    <div className="rainbow-flex rainbow-align-content_center main-header">
              <div className="rainbow-p-around_small">
        <Button  variant="brand" label="Edit" onClick={onEdit} />
      </div>
      <div className="rainbow-p-around_small">
        <Button variant="destructive" label="Delete" onClick={onDelete} />
      </div>
    </div>
  );
}

function DrawerEditFooter({ onSave, onCancel }) {
  return (
    <div className="rainbow-flex rainbow-align-content_center main-header">
      <div className="rainbow-p-around_small">
        <Button variant="success" label="Save" onClick={onSave} />
      </div>
      <div className="rainbow-p-around_small">
        <Button  variant="destructive" label="Cancel" onClick={onCancel} />
      </div>
    </div>
  );
}
