import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { FormattedMessage } from 'react-intl';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { setEmail, setEmailAgain } from '../../actions/shopActions';

function Example() {
  const [show, setShow] = React.useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}


function UserInput({email, email_again, dispatch}) {
  const history = useHistory();

  function handleChange(selector, e) {
    switch (selector) {
      case "email":
        dispatch(setEmail(e.target.value));
        break;

      case "email_again":
        dispatch(setEmailAgain(e.target.value));
        break;

      default:
        break;
    }
    console.log(email);
  }

  // Redirects to next page
  function submit() {
    if (email === email_again) {
      history.push('/checkout');
    } else {
     return 
    }
  }

  return (
    <div className="shopMain">
      <Navbar />
      <Example />
      <div className="userinputGrid">
        <div className="userinputGrid-left">
          <div className="userinputGrid-row"><FormattedMessage id="e-mail" defaultMessage="E-mail:" /></div>
          <div className="userinputGrid-row"><FormattedMessage id="e-mail_again" defaultMessage="E-mail again:" /></div>
          <div className="userinputGrid-row"><p></p></div>
        </div>
        <div className="userinputGrid-right">
          <input onChange={(e) => handleChange("email", e)}></input>
          <input onChange={(e) => handleChange("email_again", e)}></input>
          <button onClick={() => submit()}>Mindent elfogadok.</button>
        </div>
      </div>
      <Footer />
    </div>
  )
}

const mapStateToProps = state => ({
  email: state.shop.email,
  email_again: state.shop.email_again,
})

export default connect(mapStateToProps)(UserInput);