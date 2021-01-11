import React from 'react'; 
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { setUserError } from '../../actions/shopActions';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';


function ErrorMessage({error, dispatch}) {
  const [show, setShow] = React.useState(false);

  //const handleClose = () => setShow(false);
  const handleClose = () => dispatch(setUserError(false));;
  const handleShow = () => setShow(true);

  function x() {
    console.log("x");
  }

  return (
    <>
      <Modal show={error} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title><FormattedMessage id="form_error" defaultMessage="Something is not right with the form."/></Modal.Title>
        </Modal.Header>
        <Modal.Body><FormattedMessage id="email_error_different" defaultMessage="Make sure that the two e-mail fields are the same and the passwords are the same." /></Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Done
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

const mapStateToProps = state => ({
  error: state.shop.userdata_error,
});

export default connect(mapStateToProps)(ErrorMessage);