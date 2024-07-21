import React from 'react';
import { Box, Typography } from '@mui/material';

const Homepage = () => {
  return (
    <Box 
      className="min-h-screen flex flex-col items-center justify-center bg-blue-50"
      p={4}
    >
      <Typography 
        variant="h1" 
        component="h1" 
        gutterBottom 
        style={{ 
          fontWeight: 'bold', 
          color: '#00285e', 
          fontSize: '6rem', 
          textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
        }}
      >
        Welcome to Assignment Auditor!
      </Typography>
      <Typography 
        variant="body1" 
        component="p" 
        maxWidth="600px" 
        textAlign="center"
        style={{ 
          color: '#005792',
          fontWeight: 'bold',
          fontSize: '1rem', 
          // textShadow: '2px 2px 4px rgba(0,0,0,0.5)'

        }}
      >
        Assignment Auditor is an efficient platform where code reviewers and students can seamlessly collaborate. Students can submit their assignments via GitHub, and available code reviewers can claim them, provide detailed code reviews with video URLs, and update the status to "completed" or "needs review." This ensures that both parties are always aware of the status of their assignments and work.
      </Typography>
    </Box>
  );
};

export default Homepage;
