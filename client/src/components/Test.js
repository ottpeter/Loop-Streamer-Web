import React from 'react'; 
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import PaypalComponent from './PaypalTest';

function Example() {
  const [show, setShow] = React.useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  async function getInfo() {
    const requestOptions = {
      method: 'GET',
      headers: {
        'User-Agent': 'curl/7.35.0',
        'Host': 'console.kamatera.com',
        'Accept': '*/*',
        'AuthClientId': 'a759573dab2e33880e3b5f5492a8a227',
        'AuthSecret': 'bbae6d1ba15fe6444786bec36839c84c'
      }
    }
    const res = await fetch('https://console.kamatera.com/service/servers', requestOptions)
    .then(response => response.json())
    .catch(err => console.error("Error: ", err));
    console.log("Kamatera response: ", res);
  }

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
      <button onClick={() => getInfo()} className="btn-info"> Get Kamatera Info</button>
    </>
  );
}

export default Example;