import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import constants from "../../utils/constants";
import { useHistory } from "react-router-dom";

function OpenModal({
  isOpen,
  onCancelClickListner,
  userName,
  deactivateUser,
  userId,
  userStatus,
  editFlag,
}) {
  const [show, setShow] = useState(false);
  const history = useHistory();

  const goToEditPage = (userId) => {
    history.push(`${constants.ROUTE.SIDEBAR.SETTINGS.EDIT_USER}${userId}`);
    setShow(true);
  };
  return (
    <>
      {editFlag ? (
        <Modal 
          show={isOpen}
          onHide={onCancelClickListner}
          backdrop="static"
          keyboard={false}
          centered={true}
          contentClassName="custome-modal"
        >
          <Modal.Header className="role_header_model" closeButton>
            <Modal.Title>Reactivate {userName?userName:""} ?</Modal.Title>
          </Modal.Header>
          <Modal.Body className="role_body_model">
            This will allow the user access to Expandopedia features set
            previously by their admin. Continue to edit to make changes to user
            and subscription info.
          </Modal.Body>
          <Modal.Footer className="role_footer_model">
            <Button variant="secondary" onClick={onCancelClickListner}>
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={() =>
                history.push({
                  pathname: `${constants.ROUTE.SIDEBAR.SETTINGS.EDIT_USER}${userId}`,
                  state: { editFlag: "true" },
                })
              }
            >
              Continue to Edit User
            </Button>
          </Modal.Footer>
        </Modal>
      ) : (
        <Modal
          show={isOpen}
          onHide={onCancelClickListner}
          backdrop="static"
          keyboard={false}
          centered={true}
          contentClassName="custome-modal"
        >
          <Modal.Header className="role_header_model" closeButton>
            <Modal.Title>
              {userStatus
                ? `Deactivate User ${userName?userName:""} ?`
                : `Activate User ${userName?userName:""} ?`}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="role_body_model">
            {userStatus
              ? "  This does not delete the user's account."
              : "This will activate the user."}
          </Modal.Body>
          <Modal.Footer className="role_footer_model">
            <Button variant="secondary" onClick={onCancelClickListner}>
              Cancel
            </Button>
            <Button variant="primary" onClick={() => deactivateUser(userId)}>
              {userStatus ? "Deactivate" : "Activate"}
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
}

export default OpenModal;
