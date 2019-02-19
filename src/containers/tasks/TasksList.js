// Smart component that renders the Task list view
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import Moment from 'react-moment';
import { Badge, DropdownItem } from 'reactstrap';
import qs from 'qs';
import * as taskActions from '../../store/tasks/actions';
import * as globalActions from '../../store/global/actions';
import * as taskSelectors from '../../store/tasks/reducer';
import * as globalSelectors from '../../store/global/reducer';
import * as errorHandlerSelectors from '../../store/errorHandler/reducer';
import * as constants from '../../constants';
import '../LoadListAnimation.css';
import ListView from '../../components/ListView';
import ElementMap from '../ElementMap';
import FilterElementMap from '../FilterElementMap';
import NoResults from '../../components/NoResults';
import { withAlert } from 'react-alert';

import './TaskList.css';

export class TasksList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
    this.handleChange = this.handleChange.bind(this);
  }

  getFetchURL(search, status, pageNumber) {
    return `${constants.API_ENDPOINT}/tasks/?ordering=${
      constants.TASK_SORT_FIELD
    }&search=${search}&status=${status}&page=${pageNumber}`;
  }

  async componentDidMount() {
    this.props.showListTitle();
    this.props.changePageTitle('Tasks');
    this.props.changePageTitleButton('+ Create Task');
    this.props.changePageTarget('/tasks/new');

    let { search } = qs.parse(this.props.location.search.slice(1));
    let { status } = qs.parse(this.props.location.search.slice(1));
    const { page } = qs.parse(this.props.location.search.slice(1));

    if (search === undefined) {
      search = '';
    }

    this.props.searchVal(search);

    if (status === undefined) {
      status = '';
    }

    this.props.getStatus(status);

    let pageNumber = Number(page);

    if (isNaN(pageNumber)) {
      pageNumber = 1;
    }
    this.props.pageNum(pageNumber);
    const url = this.getFetchURL(search, status, pageNumber);

    await this.props.fetchTasks(url);
    this.props.changePageNumber(pageNumber);
  }

  componentDidUpdate(prevProps) {
    let { search } = qs.parse(this.props.location.search.slice(1));
    if (search === undefined) {
      search = '';
    }

    let { status } = qs.parse(this.props.location.search.slice(1));

    if (status === undefined) {
      status = '';
    }

    const { page } = qs.parse(this.props.location.search.slice(1));
    if (Number(page) !== this.props.currentPage && !isNaN(page)) {
      const pageNumber = Number(page);
      const url = this.getFetchURL(search, status, pageNumber);

      this.props.fetchTasks(url);
      this.props.changePageNumber(pageNumber);
    }

    if (this.props.hasError !== prevProps.hasError) {
      if (this.props.hasError === true) {
        this.props.alert.show(this.props.errorMessage);
      }
    }
  }

  handleChange(e) {
    const status = e.target.getAttribute('data-key');
    if (status === null) {
      this.setState({
        isOpen: !this.state.isOpen
      });
      return false;
    }
    const pageValue = this.props.pageParam;
    const searchString = this.props.searchParam;
    const url = this.getFetchURL(searchString, status, pageValue);

    this.props.fetchTasks(url);
    this.props.getStatus(status !== '' ? status : '');
    this.setState({
      isOpen: !this.state.isOpen
    });
    return true;
  }

  render() {
    if (this.props.searchParam !== '' && this.props.taskCount === null) {
      return this.renderLoading();
    }
    if (this.props.taskCount === 0) {
      return (
        <NoResults
          searchVal={this.props.searchParam}
          taskStatus={this.props.taskStatus}
          endpoint="tasks"
        />
      );
    }
    if (this.props.rowsIdArray.length <= 0) return this.renderLoading();

    return (
      <div className="TasksList">
        <ListView
          renderHeaders={this.renderHeaders.bind(this)}
          rowsIdArray={this.props.rowsIdArray}
          rowsById={this.props.rowsById}
          renderRow={this.renderRow}
          endpoint="tasks"
          pageLinks={this.props.pageLinks}
          totalPages={this.props.totalPages}
          currentPage={this.props.currentPage}
          firstPage={this.props.firstPage}
          lastPage={this.props.lastPage}
          searchVal={this.props.searchParam}
          sortField={constants.TASK_SORT_ATTRIBUTE}
          sortOrder={constants.SORT_DESC}
          taskStatus={this.props.taskStatus}
          taskCount={this.state.taskCount}
        />
      </div>
    );
  }

  renderLoading() {
    return (
      <center>
        <div className="lds-ripple">
          <div />
          <div />
        </div>
      </center>
    );
  }

  renderHeaders() {
    const statusList = ['', ...constants.TASK_STATUSES];

    const statusArr = statusList.map(s => {
      let status = '';
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
          status = '';
      }

      return (
        <DropdownItem className={`${s === this.props.taskStatus ? 'active-task' : ''}`} key={s}>
          <Link
            to={
              this.props.pageLinks.first
                ? `/tasks/?search=${
                    !this.props.searchParam || this.props.searchParam === undefined
                      ? ''
                      : this.props.searchParam
                  }&status=${!s || s === undefined ? '' : s}&page=${
                    !this.props.firstPage || typeof this.props.firstPage !== Number
                      ? 1
                      : this.props.firstPage
                  }`
                : '#'
            }
            className="nav-link"
            key={s}
            data-key={s}
          >
            {status}
          </Link>
        </DropdownItem>
      );
    });

    const headerItems = [
      constants.NAME,
      constants.NEED_REVIEW,
      constants.CREATED,
      constants.EXPIRES,
      constants.FORM
    ];
    const filterFields = {
      Status: statusArr
    };

    return (
      <FilterElementMap
        listItems={headerItems}
        HTMLTag="th"
        handleChangeFunctions={[this.handleChange]}
        isOpenStates={[this.state.isOpen]}
        filterFields={filterFields}
      />
    );
  }

  renderRow(row) {
    const rowItems = [
      <Badge key={row.id} className={`task-badge status-${row.attributes.status}`}>
        {row.attributes.status_display}
      </Badge>,
      <Link to={`/tasks/${row.id}`} key="link_to">
        {row.attributes.name}
      </Link>,
      `${row.attributes.pending_submissions_count}/${row.attributes.submission_count}`,
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
    searchParam: globalSelectors.getSearchValue(state),
    taskStatus: taskSelectors.getTaskStatus(state),
    taskCount: taskSelectors.getTotalCount(state),
    hasError: errorHandlerSelectors.getHasError(state),
    errorMessage: errorHandlerSelectors.getErrorMessage(state),
    pageParam: globalSelectors.getPageNum(state)
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
      searchVal: globalActions.getSearchVal,
      getStatus: taskActions.getStatus,
      pageNum: globalActions.getPageNumber
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withAlert(TasksList));
