import {React, useState} from 'react';

import { Link } from 'react-router-dom';
import { AlertTitle, Alert, Collapse, Button } from '@mui/material';

const MainPage = () => {
  const [showAlert, setShowAlert] = useState(false);

  return (
    <div>
      <h1>Welcome to the Bookstore</h1>
      <nav>
        <ul>
          <li>
            <Link to="/authors">Authors</Link>
          </li>
          <li>
            <Link to="/books">Books</Link>
          </li>
        </ul>
      </nav>
      
    {/* <Button onClick={() => setShowAlert(true)}>
      Show Alert
    </Button>
    <Collapse in={showAlert} sx={{ position: 'fixed', top: 0, left: 0, width: '100%' }}>
      <Alert severity="error" onClose={() => setShowAlert(false)}>
        <AlertTitle>Error</AlertTitle>
        This is an error Alert with a scary title.
      </Alert>
    </Collapse> */}
    </div>
  );
};

export default MainPage;