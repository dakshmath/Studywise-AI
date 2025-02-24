import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../config/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { motion } from 'framer-motion';
import { Box, Container, Paper, TextField, Button, Typography, Switch, FormControlLabel } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  background: 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(10px)',
  borderRadius: '15px',
  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
  width: '100%',
  maxWidth: '400px',
}));

const AnimatedBackground = styled(Box)({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  overflow: 'hidden',
  background: 'white',
  zIndex: -1,
});

const Divider = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  margin: theme.spacing(2, 0),
  width: '100%',
  '&::before, &::after': {
    content: '""',
    flex: 1,
    borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
  },
  '& > span': {
    margin: theme.spacing(0, 2),
    color: 'rgba(0, 0, 0, 0.5)',
    fontSize: '0.875rem',
  },
}));

const GoogleButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#fff',
  color: '#757575',
  border: '1px solid #ddd',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  '&:hover': {
    backgroundColor: '#f5f5f5',
  },
  marginBottom: theme.spacing(2),
  padding: theme.spacing(1.5),
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: theme.spacing(1),
  '& img': {
    marginRight: theme.spacing(1)
  },
  '& span': {
    fontWeight: 800
  }
}));

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
  });

  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      navigate('/dashboard');
    } catch (error) {
      alert(error.message || 'Failed to login with Google');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, formData.email, formData.password);
      } else {
        await createUserWithEmailAndPassword(auth, formData.email, formData.password);
        // Update user profile with name
        if (auth.currentUser) {
          await updateProfile(auth.currentUser, {
            displayName: formData.name
          });
        }
      }
      navigate('/dashboard');
    } catch (error) {
      alert(error.message || 'An error occurred');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        zIndex: 1,
      }}>
      <Box
        sx={{
          width: '100%',
          maxWidth: '400px',
          mx: 'auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
      <AnimatedBackground>
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            style={{
              position: 'absolute',
              background: `rgba(100, 149, 237, ${0.1 + i * 0.05})`,
              borderRadius: '50%',
              width: '200px',
              height: '200px',
            }}
            animate={{
              x: [Math.random() * window.innerWidth, Math.random() * window.innerWidth],
              y: [Math.random() * window.innerHeight, Math.random() * window.innerHeight],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 20 + i * 2,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          />
        ))}
      </AnimatedBackground>

      <Box sx={{ width: '100%', textAlign: 'center', mb: 4 }}>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Typography
            variant="h2"
            sx={{
              fontWeight: 'bold',
              background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 2
            }}
          >
            Studywise AI
          </Typography>
        </motion.div>
      </Box>
      <StyledPaper elevation={6}>
        <Typography component="h1" variant="h4" sx={{ mb: 3 }}>
          {isLogin ? 'Sign In' : 'Sign Up'}
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
          <GoogleButton
            onClick={(e) => {
              e.preventDefault();
              handleGoogleLogin();
            }}
          >
            <svg width="18" height="18" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
              <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
              <path fill="none" d="M0 0h48v48H0z"/>
            </svg>
            <span>Continue with Google</span>
          </GoogleButton>

          <Divider>
            <span>OR</span>
          </Divider>
          {!isLogin && (
            <TextField
              margin="normal"
              required
              fullWidth
              name="name"
              label="Full Name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              sx={{
                '& .MuiInputBase-root': {
                  backgroundColor: 'transparent',
                  '& input': {
                    backgroundColor: 'transparent !important',
                    color: 'black',
                    '&:-webkit-autofill': {
                      transition: 'background-color 5000s ease-in-out 0s',
                      WebkitTextFillColor: 'black !important',
                      WebkitBoxShadow: 'none'
                    }
                  }
                }
              }}
            />
          )}
          <TextField
            margin="normal"
            required
            fullWidth
            name="email"
            label="Email Address"
            type="email"
            value={formData.email}
            onChange={handleChange}
            sx={{
              '& .MuiInputBase-root': {
                backgroundColor: 'transparent',
                '& input': {
                  backgroundColor: 'transparent !important',
                  color: 'black',
                  '&:-webkit-autofill': {
                    transition: 'background-color 5000s ease-in-out 0s',
                    WebkitTextFillColor: 'black !important',
                    WebkitBoxShadow: 'none'
                  }
                }
              }
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            value={formData.password}
            sx={{
              '& .MuiInputBase-root': {
                backgroundColor: 'transparent',
                '& input': {
                  backgroundColor: 'transparent !important',
                  color: 'black',
                  '&:-webkit-autofill': {
                    transition: 'background-color 5000s ease-in-out 0s',
                    WebkitTextFillColor: 'black !important',
                    WebkitBoxShadow: 'none'
                  }
                }
              }
            }}
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, bgcolor: 'cornflowerblue' }}
          >
            {isLogin ? 'Sign In' : 'Sign Up'}
          </Button>
          <FormControlLabel
            control={
              <Switch
                checked={isLogin}
                onChange={() => setIsLogin(!isLogin)}
                color="primary"
              />
            }
            label={isLogin ? 'Need an account? Sign Up' : 'Already have an account? Sign In'}
          />
        </Box>
      </StyledPaper>
      </Box>
    </Box>
  );
};

export default AuthPage;
