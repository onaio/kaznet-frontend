import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import ExportForm from './ExportForm';

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
            Approved Submissions of {this.props.name}
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
