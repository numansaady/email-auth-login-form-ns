import "bootstrap/dist/css/bootstrap.min.css";
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import "./App.css";
import app from "./firebase.init";

const auth = getAuth(app);
function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registered, setRegistered] = useState(false);
  const [error, setError] = useState("");
  const [validated, setValidated] = useState(false);

  const handleNameBlur = (event)=> {
    setName(event.target.value)
  }
  const handleEmailBlur = (event) => {
    setEmail(event.target.value);
  };

  const handlePassBlur = (event) => {
    setPassword(event.target.value);
  };

  const handleRegisteredChange = event => {
    setRegistered(event.target.checked)
  }

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      return;
    }

    if (
      /(^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[a-zA-Z!#$%&? "])[a-zA-Z0-9!#$%&?]{5,20}$)/.test(
        password
      )
    ) {
      setError("Password should contain Capital Small Special Digit character");
      return;
    }

    setValidated(true);
    setError("");

    if(registered){
      signInWithEmailAndPassword(auth, email, password)
      .then(result => {
        const user = result.user;
        console.log(user);
      })
      .catch(error => {
        console.error(error)
        setError(error.message)
      })
    }
    else(
      createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        setEmail("");
        setPassword("");
        emailVerify();
        setUserProfile();
      })
      .catch((error) => {
        console.error(error);
        setError(error.message);
      })
    )
    event.preventDefault();
  };

  const handlePasswordReset = () => {
    sendPasswordResetEmail(auth, email)
  }

  const setUserProfile = () => {
    updateProfile(auth.currentUser, {
      displayName: name
    })
  }
  const emailVerify = () => {
    sendEmailVerification(auth.currentUser);
    console.log('Verification Email sent.')
  }
  return (
    <div className="App">
      <div className="registraion w-50 mx-auto">
        <h2 className="text-primary">Please {registered ? 'Login' : 'Register'}</h2>
        <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
          { !registered && <Form.Group className="mb-3" controlId="">
            <Form.Label>Your Name</Form.Label>
            <Form.Control
              onBlur={handleNameBlur}
              type="text"
              placeholder="Enter Your Name"
              required
            />
            <Form.Control.Feedback type="invalid">
              Please provide your name.
            </Form.Control.Feedback>
          </Form.Group>}
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              onBlur={handleEmailBlur}
              type="email"
              placeholder="Enter email"
              required
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
            <Form.Control.Feedback type="invalid">
              Please provide a valid Email.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              onBlur={handlePassBlur}
              type="password"
              placeholder="Password"
              required
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid Password.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check onChange={handleRegisteredChange} type="checkbox" label="Already Registered?" />
          </Form.Group>
          <p className="text-danger">{error}</p>
          <Button onClick={handlePasswordReset} variant="link" >Forget Password?</Button> <br />
          <Button variant="primary" type="submit">
            {registered ? 'Login' : 'Register'}
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default App;
