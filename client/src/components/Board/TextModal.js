import React from 'react'; 
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl'
import { changeSetting, changeSettingValue } from '../../actions/boardActions';
import { setUserError } from '../../actions/shopActions';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { CLOSE_TEXT_MODAL } from '../../actions/actionNames';


function TextModal({show, titleId, titleText, messageId, messageText, prefix, dispatch, settingName, settingValue}) {
  //const handleClose = () => dispatch(setUserError(false));

  function closeWithoutSaving() {
    dispatch({type: CLOSE_TEXT_MODAL});
    // and close modal
  }

  function saveAndExit() {
    dispatch({type: CLOSE_TEXT_MODAL});
    dispatch(changeSetting(settingName, settingValue));
    // and close modal
  }

  function changeValue(e) {
    dispatch(changeSettingValue(e.target.value));
    console.log("e:", e.target.value)
  }


  return (
    <>
      <Modal show={show} onHide={closeWithoutSaving} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title><FormattedMessage id={titleId}  defaultMessage={titleText} /></Modal.Title>
        </Modal.Header>
        <Modal.Body><FormattedMessage id={messageId}  defaultMessage={messageText} /></Modal.Body>
        <InputGroup className="mb-3" >
        <InputGroup.Prepend >
          <InputGroup.Text id="basic-addon3">
            {prefix}
          </InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl id="basicurl" onChange={(e) => changeValue(e)} aria-describedby="basic-addon3" />
        </InputGroup>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeWithoutSaving}>
            Close
          </Button>
          <Button variant="primary" onClick={saveAndExit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

const mapStateToProps = state => ({
  titleId: state.board.modalTitleID,
  titleText: state.board.modalTitle,
  messageId: state.board.modalTextID,
  messageText: state.board.modalText,
  prefix: state.board.modalPrefix,
  settingName: state.board.settingName,
  settingValue: state.board.settingValue,

});

export default connect(mapStateToProps)(TextModal);

