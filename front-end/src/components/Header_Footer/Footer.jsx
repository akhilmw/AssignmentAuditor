import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: '#98c5e9',
        padding: '40px 0',
        borderTop: '2px solid #00285e',
        width: '100%',
        textAlign: 'center',
        marginTop: 'auto',
      }}
    >
      <Typography variant="body2" sx={{ color: '#00285e' }}>
        &copy; {new Date().getFullYear()} Assignment Auditor. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
