// This component renders a list using Bootstrap 4 tables
import _ from 'lodash';
import React, { Component } from 'react';
import { Table, Pagination, PaginationItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import * as constants from '../constants';
import ExportModal from './ExportModal';

import './ListView.scss';

export default class ListView extends Component {
  renderRowById(rowId) {
    const { renderRow, rowsById, downloadModalHandler, setUserDetails } = this.props;
    return (
      <tr key={rowId}>{renderRow(_.get(rowsById, rowId), downloadModalHandler, setUserDetails)}</tr>
    );
  }

  renderRowObject(rowObject) {
    const { renderRow, downloadModalHandler, setUserDetails } = this.props;
    return <tr key={rowObject.id}>{renderRow(rowObject, downloadModalHandler, setUserDetails)}</tr>;
  }

  renderPagination() {
    const {
      endpoint,
      pageLinks,
      searchVal,
      firstPage,
      lastPage,
      totalPages,
      taskStatus,
      hasTask,
      currentPage
    } = this.props;
    return (
      <Pagination aria-label="Kaznet listview">
        <PaginationItem disabled={!pageLinks.first}>
          <Link
            to={
              pageLinks.first
                ? `/${endpoint}/?search=${
                    !searchVal || searchVal === undefined ? '' : searchVal
                  }&page=${!firstPage || typeof firstPage !== 'number' ? 1 : firstPage}${
                    taskStatus ? `&status=${taskStatus}` : ''
                  }${hasTask ? `&has_task=${hasTask}` : ''}`
                : '#'
            }
            className="page-link"
            aria-label="First"
          >
            First
          </Link>
        </PaginationItem>
        <PaginationItem disabled={!pageLinks.prev}>
          <Link
            to={
              pageLinks.prev
                ? `/${endpoint}/?search=${!searchVal ? '' : searchVal}&page=${currentPage - 1}${
                    taskStatus ? `&status=${taskStatus}` : ''
                  }${hasTask ? `&has_task=${hasTask}` : ''}`
                : '#'
            }
            className="page-link"
            aria-label="Previous"
          >
            &laquo;
          </Link>
        </PaginationItem>
        <PaginationItem disabled={!pageLinks.next}>
          <Link
            to={
              pageLinks.next
                ? `/${endpoint}/?search=${!searchVal ? '' : searchVal}&page=${currentPage + 1}${
                    taskStatus ? `&status=${taskStatus}` : ''
                  }${hasTask ? `&has_task=${hasTask}` : ''}`
                : '#'
            }
            className="page-link"
            aria-label="Next"
          >
            &raquo;
          </Link>
        </PaginationItem>
        <PaginationItem disabled={!pageLinks.last}>
          <Link
            to={
              pageLinks.last
                ? `/${endpoint}/?search=${!searchVal ? '' : searchVal}&page=${
                    !lastPage || lastPage === undefined ? totalPages : lastPage
                  }${taskStatus ? `&status=${taskStatus}` : ''}${
                    hasTask ? `&has_task=${hasTask}` : ''
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

  render() {
    const {
      sortField,
      downloadModalHandler,
      modalState,
      className,
      onFormSubmit,
      userName,
      isFormPage,
      renderHeaders,
      pageLinks,
      endpoint,
      searchVal,
      firstPage,
      rowsById,
      totalPages,
      rowsIdArray,
      sortOrder
    } = this.props;

    if (sortField) {
      const rowsArray = _.values(rowsById);
      this.sortedRowsArray = _.orderBy(
        rowsArray,
        e => {
          return e.attributes[sortField];
        },
        [sortOrder]
      );
    }

    return (
      <div>
        {downloadModalHandler && (
          <ExportModal
            modalState={modalState}
            downloadModalHandler={downloadModalHandler}
            className={className}
            onFormSubmit={onFormSubmit}
            name={userName}
          />
        )}

        <Table bordered className="kaznet-table">
          <thead>
            <tr>
              {isFormPage
                ? renderHeaders(
                    pageLinks.first
                      ? `/${endpoint}/?search=${
                          !searchVal || searchVal === undefined ? '' : searchVal
                        }&page=${!firstPage || typeof firstPage !== 'number' ? 1 : firstPage}`
                      : '#'
                  )
                : renderHeaders()}
            </tr>
          </thead>
          <tbody>
            {sortField
              ? _.map(this.sortedRowsArray, this.renderRowObject.bind(this))
              : _.map(rowsIdArray, this.renderRowById.bind(this))}
          </tbody>
        </Table>
        {totalPages > 1 ? this.renderPagination() : null}
      </div>
    );
  }
}

ListView.propTypes = {
  sortField: PropTypes.string,
  sortOrder: PropTypes.string,
  rowsById: PropTypes.shape({}).isRequired,
  downloadModalHandler: PropTypes.func.isRequired,
  modalState: PropTypes.bool.isRequired,
  className: PropTypes.string.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
  userName: PropTypes.string.isRequired,
  isFormPage: PropTypes.bool.isRequired,
  renderHeaders: PropTypes.func.isRequired,
  renderRow: PropTypes.func.isRequired,
  setUserDetails: PropTypes.func.isRequired,
  pageLinks: PropTypes.shape({
    first: PropTypes.string,
    prev: PropTypes.string,
    last: PropTypes.string,
    next: PropTypes.string
  }).isRequired,
  endpoint: PropTypes.string.isRequired,
  searchVal: PropTypes.string.isRequired,
  taskStatus: PropTypes.string.isRequired,
  hasTask: PropTypes.bool.isRequired,
  currentPage: PropTypes.number,
  firstPage: PropTypes.number,
  lastPage: PropTypes.number,
  totalPages: PropTypes.number,
  rowsIdArray: PropTypes.arrayOf().isRequired
};

ListView.defaultProps = {
  sortOrder: constants.SORT_ASC,
  sortField: null,
  firstPage: 1,
  lastPage: 1,
  totalPages: 1,
  currentPage: 1
};
