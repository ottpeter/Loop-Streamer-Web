import React from 'react'; 
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';


function ErrorMessage({error}) {
  const [show, setShow] = React.useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function x() {
    console.log("x");
  }

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Click to Open
      </Button>
      {console.log(error)}
      {/**error ? (setShow(true)) : (<p>nem</p>)*/}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title><FormattedMessage id="form_error" defaultMessage="Something is not right with the form."/></Modal.Title>
        </Modal.Header>
        <Modal.Body><FormattedMessage id="email_error_different" defaultMessage="The two e-mail fields are not the same. Maybe you mistyped your e-mail." /></Modal.Body>
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