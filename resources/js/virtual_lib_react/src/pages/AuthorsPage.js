import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import Swal from 'sweetalert';

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
      const response = await axios.get('https://jsonplaceholder.typicode.com/users');
      setAuthors(response.data);
    } catch (error) {
      Swal.fire('Error', 'Failed to fetch authors', 'error');
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
        await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
        setAuthors(authors.filter((author) => author.id !== id));
        Swal.fire('Deleted!', 'Author has been deleted.', 'success');
      } catch (error) {
        Swal.fire('Error', 'Failed to delete author', 'error');
      }
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault();

    if (!selectedAuthor) {
      Swal.fire('Error', 'Please select an author to edit', 'error');
      return;
    }

    try {
      await axios.put(`https://jsonplaceholder.typicode.com/users/${selectedAuthor.id}`, formData);
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
      </>
      );
};
export default AuthorsPage;
