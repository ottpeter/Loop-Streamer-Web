import React from 'react'; 
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import PaypalComponent from './PaypalTest';

function Example() {
  const [show, setShow] = React.useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Click to Open
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Done
          </Button>
        </Modal.Footer>
      </Modal>
      <PaypalComponent></PaypalComponent>
    </>
  );
}

export default Example;