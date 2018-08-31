// Smart component that renders the Task list view
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import Moment from "react-moment";
import { Badge, FormGroup, Col, Input } from "reactstrap";
import qs from "qs";
import * as taskActions from "../../store/tasks/actions";
import * as globalActions from "../../store/global/actions";
import * as taskSelectors from "../../store/tasks/reducer";
import * as globalSelectors from "../../store/global/reducer";
import * as constants from "../../constants.js";

import ListView from "../../components/ListView";
import ElementMap from "../ElementMap";

import "./TaskList.css";

export class TasksList extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  async componentDidMount() {
    this.props.showListTitle();
    this.props.changePageTitle("Tasks");
    this.props.changePageTitleButton("+ Create Task");
    this.props.changePageTarget("/tasks/new");

    let { search } = qs.parse(this.props.location.search.slice(1));
    const { page } = qs.parse(this.props.location.search.slice(1));

    if (search === undefined) {
      search = "";
    }
    this.props.searchVal(search);
    let pageNumber = Number(page);

    if (isNaN(pageNumber)) {
      pageNumber = 1;
    }

    await this.props.fetchTasks(
      `${constants.API_ENDPOINT}/tasks/?ordering=${
        constants.TASK_SORT_FIELD
      }&search=${search}&page=${pageNumber}`
    );
    this.props.changePageNumber(pageNumber);
  }

  componentDidUpdate(prevProps) {
    let { search } = qs.parse(this.props.location.search.slice(1));
    if (search === undefined) {
      search = "";
    }
    const { page } = qs.parse(this.props.location.search.slice(1));
    if (Number(page) !== this.props.currentPage && !isNaN(page)) {
      const pageNumber = Number(page);
      this.props.fetchTasks(
        `${constants.API_ENDPOINT}/tasks/?ordering=${
          constants.TASK_SORT_FIELD
        }&search=${search}&page=${pageNumber}`
      );
      this.props.changePageNumber(pageNumber);
    }
  }

  handleChange(e) {
    const status = e.target.value;
    const param = `?status=${status}`;
    this.props.fetchTasks(
      `${constants.API_ENDPOINT}/tasks/${status === "all" ? "" : param}`
    );
  }

  render() {
    const statuses = constants.TASK_STATUSES;
    const statusArr = statuses.map(s => {
      let status = "";
      switch (s) {
        case "a":
          status = "Active";
          break;
        case "b":
          status = "Deactivated";
          break;
        case "c":
          status = "Expired";
          break;
        case "d":
          status = "Draft";
          break;
        case "e":
          status = "Archived";
          break;
        case "s":
          status = "Scheduled";
          break;
        default:
          status = "";
      }
      return (
        <option value={s} key={s}>
          {status}
        </option>
      );
    });
    if (!this.props.rowsById) return this.renderLoading();
    return (
      <div className="TasksList">
        <FormGroup className="row">
          <Col sm="3" />
          <Col md="2">
            <Input
              name="required_expertise"
              type="select"
              bsSize="lg"
              placeholder="Required Expertise"
              aria-label="required expertise"
              onChange={this.handleChange}
            >
              <option value="all">All</option>
              {statusArr}
            </Input>
          </Col>
        </FormGroup>
        <ListView
          renderHeaders={this.renderHeaders}
          rowsIdArray={this.props.rowsIdArray}
          rowsById={this.props.rowsById}
          renderRow={this.renderRow}
          endpoint={"tasks"}
          pageLinks={this.props.pageLinks}
          totalPages={this.props.totalPages}
          currentPage={this.props.currentPage}
          firstPage={this.props.firstPage}
          lastPage={this.props.lastPage}
          searchVal={this.props.searchParam}
          sortField={constants.TASK_SORT_ATTRIBUTE}
          sortOrder={constants.SORT_DESC}
        />
      </div>
    );
  }

  renderLoading() {
    return <p>Loading...</p>;
  }

  renderHeaders() {
    const headerItems = [
      "Status",
      "Name",
      "Need Review",
      "Created",
      "Expires",
      "Form"
    ];
    return <ElementMap items={headerItems} HTMLTag="th" />;
  }

  renderRow(row) {
    const rowItems = [
      <Badge
        key={row.id}
        className={"task-badge status-" + row.attributes.status}
      >
        {row.attributes.status_display}
      </Badge>,
      <Link to={`/tasks/${row.id}`} key="link_to">
        {row.attributes.name}
      </Link>,
      row.attributes.pending_submissions_count +
        "/" +
        row.attributes.submission_count,
      <Moment key={row.id} format="DD-MM-YYYY">
        {row.attributes.start}
      </Moment>,
      <Moment key={row.id} format="DD-MM-YYYY">
        {row.attributes.end}
      </Moment>,
      row.attributes.xform_title
    ];
    return <ElementMap items={rowItems} HTMLTag="td" />;
  }
}

// which props do we want to inject, given the global store state?
function mapStateToProps(state) {
  return {
    rowsById: taskSelectors.getTasksById(state),
    rowsIdArray: taskSelectors.getTasksIdArray(state),
    totalPages: taskSelectors.getTotalPages(state),
    currentPage: taskSelectors.getCurrentPage(state),
    pageLinks: taskSelectors.getPageLinks(state),
    firstPage: taskSelectors.getFirstPage(state),
    lastPage: taskSelectors.getLastPage(state),
    searchParam: globalSelectors.getSearchValue(state)
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      fetchTasks: taskActions.fetchTasks,
      changePageNumber: taskActions.changePageNumber,
      changePageTitle: globalActions.changePageTitle,
      changePageTitleButton: globalActions.changePageTitleButton,
      changePageTarget: globalActions.changePageTarget,
      showListTitle: globalActions.toggleDetailTitleOff,
      searchVal: globalActions.getSearchVal
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TasksList);
