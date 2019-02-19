// This component renders a list using Bootstrap 4 tables
import _ from 'lodash';
import React, { Component } from 'react';
import { Table, Pagination, PaginationItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import * as constants from '../constants';

import ExportModal from './ExportModal';

import './ListView.css';

export default class ListView extends Component {
  render() {
    if (this.props.sortField) {
      const { sortField } = this.props;
      let sortOrder = constants.SORT_ASC;
      if (this.props.sortOrder) {
        sortOrder = this.props.sortOrder;
      }
      const rowsArray = _.values(this.props.rowsById);
      this.sortedRowsArray = _.orderBy(
        rowsArray,
        function(e) {
          return e.attributes[sortField];
        },
        [sortOrder]
      );
    }

    return (
      <div>
        {this.props.downloadModalHandler && (
          <ExportModal
            modalState={this.props.modalState}
            downloadModalHandler={this.props.downloadModalHandler}
            className={this.props.className}
            onFormSubmit={this.props.onFormSubmit}
            name={this.props.userName}
          />
        )}

        <Table bordered className="kaznet-table">
          <thead>
            <tr>
              {this.props.isFormPage
                ? this.props.renderHeaders(
                    this.props.pageLinks.first
                      ? `/${this.props.endpoint}/?search=${
                          !this.props.searchVal || this.props.searchVal === undefined
                            ? ''
                            : this.props.searchVal
                        }&page=${
                          !this.props.firstPage || typeof this.props.firstPage !== Number
                            ? 1
                            : this.props.firstPage
                        }`
                      : '#'
                  )
                : this.props.renderHeaders()}
            </tr>
          </thead>
          <tbody>
            {this.props.sortField
              ? _.map(this.sortedRowsArray, this.renderRowObject.bind(this))
              : _.map(this.props.rowsIdArray, this.renderRowById.bind(this))}
          </tbody>
        </Table>
        {this.props.totalPages > 1 ? this.renderPagination() : null}
      </div>
    );
  }

  renderRowById(rowId) {
    return (
      <tr key={rowId}>
        {this.props.renderRow(
          _.get(this.props.rowsById, rowId),
          this.props.downloadModalHandler,
          this.props.setUserDetails
        )}
      </tr>
    );
  }

  renderRowObject(rowObject) {
    return (
      <tr key={rowObject.id}>
        {this.props.renderRow(
          rowObject,
          this.props.downloadModalHandler,
          this.props.setUserDetails
        )}
      </tr>
    );
  }

  renderPagination() {
    return (
      <Pagination aria-label="Kaznet listview">
        <PaginationItem disabled={!this.props.pageLinks.first}>
          <Link
            to={
              this.props.pageLinks.first
                ? `/${this.props.endpoint}/?search=${
                    !this.props.searchVal || this.props.searchVal === undefined
                      ? ''
                      : this.props.searchVal
                  }&page=${
                    !this.props.firstPage || typeof this.props.firstPage !== Number
                      ? 1
                      : this.props.firstPage
                  }${this.props.taskStatus ? `&status=${this.props.taskStatus}` : ''}${
                    this.props.hasTask ? `&has_task=${this.props.hasTask}` : ''
                  }`
                : '#'
            }
            className="page-link"
            aria-label="First"
          >
            First
          </Link>
        </PaginationItem>
        <PaginationItem disabled={!this.props.pageLinks.prev}>
          <Link
            to={
              this.props.pageLinks.prev
                ? `/${this.props.endpoint}/?search=${
                    !this.props.searchVal ? '' : this.props.searchVal
                  }&page=${this.props.currentPage - 1}${
                    this.props.taskStatus ? `&status=${this.props.taskStatus}` : ''
                  }${this.props.hasTask ? `&has_task=${this.props.hasTask}` : ''}`
                : '#'
            }
            className="page-link"
            aria-label="Previous"
          >
            &laquo;
          </Link>
        </PaginationItem>
        <PaginationItem disabled={!this.props.pageLinks.next}>
          <Link
            to={
              this.props.pageLinks.next
                ? `/${this.props.endpoint}/?search=${
                    !this.props.searchVal ? '' : this.props.searchVal
                  }&page=${this.props.currentPage + 1}${
                    this.props.taskStatus ? `&status=${this.props.taskStatus}` : ''
                  }${this.props.hasTask ? `&has_task=${this.props.hasTask}` : ''}`
                : '#'
            }
            className="page-link"
            aria-label="Next"
          >
            &raquo;
          </Link>
        </PaginationItem>
        <PaginationItem disabled={!this.props.pageLinks.last}>
          <Link
            to={
              this.props.pageLinks.last
                ? `/${this.props.endpoint}/?search=${
                    !this.props.searchVal ? '' : this.props.searchVal
                  }&page=${
                    !this.props.lastPage || this.props.lastPage === undefined
                      ? this.props.totalPages
                      : this.props.lastPage
                  }${this.props.taskStatus ? `&status=${this.props.taskStatus}` : ''}${
                    this.props.hasTask ? `&has_task=${this.props.hasTask}` : ''
                  }`
                : '#'
            }
            className="page-link"
            aria-label="Last"
          >
            Last
          </Link>
        </PaginationItem>
      </Pagination>
    );
  }
}
