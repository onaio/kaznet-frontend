import React, { Component } from "react";
import ExportForm from "./ExportForm";
import { Modal, ModalHeader, ModalBody } from "reactstrap";

export default class ExportModal extends Component {
  render() {
    return (
      <div>
        <Modal
          isOpen={this.props.modalState}
          toggle={this.props.downloadModalHandler}
          className={this.props.className}
        >
          <ModalHeader toggle={this.props.downloadModalHandler}>
            Submissions of {this.props.userName}
          </ModalHeader>
          <ModalBody>
            <p className="font-weight-normal">Export Submissions </p>
            <ExportForm
              onFormSubmit={this.props.onFormSubmit}
              downloadModalHandler={this.props.downloadModalHandler}
            />
          </ModalBody>
        </Modal>
      </div>
    );
  }
}
