import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Modal, Form, FormGroup} from 'react-bootstrap';
import {Swal, swal} from 'sweetalert';

// To extract the variable in the .env file. All the varibles saved in the ,env file, can be accessed using process.env.VARIABLE-NAME
// import 'dotenv/config'; 

//TODO: Comment this if you're able to use the dotenv/config import directly
import config from '../config';

// Usage
// console.log(config.apiUrl);
const pageName = 'author';


const backendUrl = `${config.apiUrl}${pageName}` ;
// BB DD: join the config.apiURL  with '/author' so that it is a complete





// This code goes the dotenv/config import
// const backendUrl = process.env.REACT_APP_BACKEND_SERVER ;

const AuthorsPage = () => {
  const [authors, setAuthors] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedAuthor, setSelectedAuthor] = useState(null);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    fetchAuthors();
  }, []);

  const fetchAuthors = async () => {
    try {

      const response = await axios.get({backendUrl});
      console.log(backendUrl);
      setAuthors(response.data);
      console.log(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(backendUrl);
      console.log('Erro: '+error.status +' ' + error );

      // Swal.fire('Error', 'Failed to fetch authors', 'error');
    }
  };

  const handleEdit = (author) => {
    setSelectedAuthor(author);
    setFormData({
      name: author.name,
      gender: author.gender,
      age: author.age,
      country: author.country,
      genre: author.genre,
    });
    setShowModal(true);
    handleOpenModal(author);
  };

  const handleOpenModal = (author) => {
    setSelectedAuthor(author);
    setFormData({
      name: author?.name || '',
      gender: author?.gender || '',
      age: author?.age || '',
      country: author?.country || '',
      genre: author?.genre || '',
    });
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleDelete = async (id) => {
    const isConfirmed = await Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this author',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    });

    if (isConfirmed.isConfirmed) {
      try {
        await axios.delete({backendUrl},`/users/${id}`);
        setAuthors(authors.filter((author) => author.id !== id));
        Swal.fire('Deleted!', 'Author has been deleted.', 'success');
      } catch (error) {
        Swal.fire('Error', 'Failed to delete author', 'error');
      }
    }
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault();

    if (!selectedAuthor) {
      Swal.fire('Error', 'Please select an author to edit', 'error');
      return;
    }

    try {
      await axios.put(`${backendUrl}${selectedAuthor.id}`, formData);
      setAuthors(
        authors.map((author) =>
          author.id === selectedAuthor.id ? { ...author, ...formData } : author
        )
      );
      Swal.fire('Success', 'Author details have been updated', 'success');
      handleCloseModal();
    } catch (error) {
      Swal.fire('Error', 'Failed to update author details', 'error');
    }
  };
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSaveAuthor = async () => {
    if (selectedAuthor) {
      // Update author
      try {
        await axios.put(`${backendUrl}/users/${selectedAuthor.id}`, formData);
        Swal.fire('Success!', 'Author updated successfully.', 'success');
        handleCloseModal();
        fetchAuthors();
      } catch (error) {
        Swal.fire('Error!', 'Failed to update author.', 'error');
      }
    } else {
      // Create author
      try {
        const response = await axios.post(`${backendUrl}/users`, formData);
        Swal.fire('Success!', 'Author created successfully.', 'success');
        handleCloseModal();
        fetchAuthors();
      } catch (error) {
        Swal.fire('Error!', 'Failed to create author.', 'error');
      }
    }
  };

  return (
    <>
      <h1>Authors</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Gender</th>
            <th>Age</th>
            <th>Country</th>
            <th>Genre</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {authors.map((author) => (
            <tr key={author.id}>
              <td>{author.name}</td>
              <td>{author.gender}</td>
              <td>{author.age}</td>
              <td>{author.country}</td>
              <td>{author.genre}</td>
              <td>
                <Button variant="primary" size="sm" onClick={() => handleEdit(author)}>
                  Edit
                </Button>{' '}
                <Button variant="danger" size="sm" onClick={() => handleDelete(author.id)}>
                  Delete
                </Button>
              </td>
              </tr>
          ))}
          </tbody>
      </Table>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedAuthor ? 'Edit Author' : 'Add Author'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="gender">
            <Form.Label>Gender</Form.Label>
            <Form.Control
              type="text"
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="age">
            <Form.Label>Age</Form.Label>
            <Form.Control
              type="number"
              name="age"
              value={formData.age}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="country">
            <Form.Label>Country</Form.Label>
            <Form.Control
              type="text"
              name="country"
              value={formData.country}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="genre">
            <Form.Label>Genre</Form.Label>
            <Form.Control
              type="text"
              name="genre"
              value={formData.genre}
              onChange={handleInputChange}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveAuthor}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      </>
      );
};
export default AuthorsPage;
