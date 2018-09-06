// This component renders a list using Bootstrap 4 tables
import _ from "lodash";
import React, { Component } from "react";
import {
  Table,
  Pagination,
  PaginationItem,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavLink
} from "reactstrap";
import { Link } from "react-router-dom";
import * as constants from "../constants";

import "./ListView.css";

export default class ListView extends Component {
  render() {
    if (this.props.sortField) {
      const sortField = this.props.sortField;
      var sortOrder = constants.SORT_ASC;
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

    const statuses = ["", ...constants.TASK_STATUSES];
    const statusArr = statuses.map(s => {
      let status = "";
      switch (s) {
        case constants.TASK_ACTIVE:
          status = constants.ACTIVE;
          break;
        case constants.TASK_DEACTIVATED:
          status = constants.DEACTIVATED;
          break;
        case constants.TASK_EXPIRED:
          status = constants.EXPIRED;
          break;
        case constants.TASK_DRAFT:
          status = constants.DRAFT;
          break;
        case constants.TASK_ARCHIVED:
          status = constants.ARCHIVED;
          break;
        case constants.TASK_SCHEDULED:
          status = constants.SCHEDULED;
          break;
        case constants.TASK_ALL:
          status = constants.ALL;
          break;
        default:
          status = "";
      }
      return (
        <DropdownItem
          className={`${s === this.props.taskStatus ? "active-task" : ""}`}
          key={s}
        >
          <NavLink className="nav-link" key={s} data-key={s}>
            {status}
          </NavLink>
        </DropdownItem>
      );
    });

    return (
      <div>
        <Table bordered className="kaznet-table">
          <thead>
            <tr>
              {this.props.isTaskPage ? (
                <th>
                  <Dropdown
                    isOpen={this.props.isOpen}
                    toggle={e => this.props.handleChange(e)}
                  >
                    <DropdownToggle caret tag="span" className="nav-link">
                      Status
                    </DropdownToggle>
                    <DropdownMenu>{statusArr}</DropdownMenu>
                  </Dropdown>
                </th>
              ) : null}
              {this.props.renderHeaders()}
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
        {this.props.renderRow(_.get(this.props.rowsById, rowId))}
      </tr>
    );
  }

  renderRowObject(rowObject) {
    return <tr key={rowObject.id}>{this.props.renderRow(rowObject)}</tr>;
  }

  renderPagination() {
    return (
      <Pagination aria-label="Page navigation example">
        <PaginationItem disabled={this.props.pageLinks.first ? false : true}>
          <Link
            to={
              this.props.pageLinks.first
                ? `/${this.props.endpoint}/?search=${
                    !this.props.searchVal || this.props.searchVal === undefined
                      ? ""
                      : this.props.searchVal
                  }&status=${
                    !this.props.taskStatus ||
                    this.props.taskStatus === undefined
                      ? ""
                      : this.props.taskStatus
                  }&page=${this.props.firstPage}`
                : "#"
            }
            className="page-link"
            aria-label="First"
          >
            First
          </Link>
        </PaginationItem>
        <PaginationItem disabled={this.props.pageLinks.prev ? false : true}>
          <Link
            to={
              this.props.pageLinks.prev
                ? `/${this.props.endpoint}/?search=${
                    !this.props.searchVal ? "" : this.props.searchVal
                  }&status=${
                    !this.props.taskStatus ? "" : this.props.taskStatus
                  }&page=${this.props.currentPage - 1}`
                : "#"
            }
            className="page-link"
            aria-label="Previous"
          >
            &laquo;
          </Link>
        </PaginationItem>
        <PaginationItem disabled={this.props.pageLinks.next ? false : true}>
          <Link
            to={
              this.props.pageLinks.next
                ? `/${this.props.endpoint}/?search=${
                    !this.props.searchVal ? "" : this.props.searchVal
                  }&status=${
                    !this.props.taskStatus ? "" : this.props.taskStatus
                  }&page=${this.props.currentPage + 1}`
                : "#"
            }
            className="page-link"
            aria-label="Next"
          >
            &raquo;
          </Link>
        </PaginationItem>
        <PaginationItem disabled={this.props.pageLinks.last ? false : true}>
          <Link
            to={
              this.props.pageLinks.last
                ? `/${this.props.endpoint}/?search=${
                    !this.props.searchVal ? "" : this.props.searchVal
                  }&status=${
                    !this.props.taskStatus ? "" : this.props.taskStatus
                  }&page=${
                    !this.props.lastPage || this.props.lastPage === undefined
                      ? 1
                      : this.props.lastPage
                  }`
                : "#"
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
