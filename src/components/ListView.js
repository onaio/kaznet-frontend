// This component renders a list using Bootstrap 4 tables
import _ from "lodash";
import React, { Component } from "react";
import { Table, Pagination, PaginationItem } from "reactstrap";
import { Link } from "react-router-dom";

export default class ListView extends Component {
  render() {
    return (
      <div>
        <Table bordered className="kaznet-table">
          <thead>
            <tr>{this.props.renderHeaders()}</tr>
          </thead>
          <tbody>
            {_.map(this.props.rowsIdArray, this.renderRowById.bind(this))}
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

  renderPagination() {
    return (
      <Pagination aria-label="Page navigation example">
        <PaginationItem disabled={this.props.pageLinks.first ? false : true}>
          <Link
            to={
              this.props.pageLinks.first
                ? `/${this.props.endpoint}/?page=first`
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
                ? `/${this.props.endpoint}/?page=${this.props.currentPage - 1}`
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
                ? `/${this.props.endpoint}/?page=${this.props.currentPage + 1}`
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
                ? `/${this.props.endpoint}/?page=last`
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
