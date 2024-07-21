import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { Button, Toolbar } from '@mui/material';
import { checkIsTokenValid } from '../../api/userApi';
import CircularProgress from '@mui/material/CircularProgress';
import { useJwt } from '../UserProvider';
import { useNavigate } from 'react-router-dom';
import { showSuccessMsg } from '../../util/tools';

const Header = () => {
  let navigate = useNavigate();
  const {jwtToken, setJwtToken} = useJwt();
  const [loading, setLoading] = useState(true);
  const [tokenValid, setTokenValid] = useState(false);

  useEffect(() => {
    const validateToken = async () => {
      try {
        const response = await checkIsTokenValid(jwtToken);
        if (response.status === 200) {
          setTokenValid(response.data);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    if (jwtToken) {
      validateToken();
    } else {
      setLoading(false);
    }
  }, [jwtToken]);

  const handleLogout = () => {
    setJwtToken(null);
  
    // Use a callback pattern to navigate after the state update is complete
    showSuccessMsg("Goodbye!");
    setTimeout(() => {
      navigate("/login")
      window.location.reload();
    }, 1000)
  };

  if (loading) {
    return <CircularProgress color='secondary' className='h-screen flex justify-center items-center' />;
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        style={{
          backgroundColor: '#98c5e9',
          boxShadow: 'none',
          padding: '20px 0',
          borderBottom: '2px solid #00285e',
        }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ fontWeight: 'bold', paddingLeft: '16px', color: '#00285e', flexGrow: 1 }}
          >
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              Assignment Auditor
            </Link>
          </Typography>
          {tokenValid && (
            <Button
              onClick={handleLogout}
              color="primary"
              sx={{ fontWeight: 'bold', color: 'white' }}
            >
              Logout
            </Button>
          )}
          {!tokenValid && (
            <Button
              onClick={() => {
                navigate("/signup");
              }}
              color="primary"
              sx={{ fontWeight: 'bold', color: 'white' }}
            >
              Sign Up
            </Button>
          )}
          {!tokenValid && (
            <Button
              onClick={() => {
                navigate("/login");
                // window.location.reload();
              }}
              color="primary"
              sx={{ fontWeight: 'bold', color: 'white' }}
            >
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
