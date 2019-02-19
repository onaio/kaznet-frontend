import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { Button } from 'reactstrap';
import Moment from 'react-moment';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import qs from 'qs';
import * as errorHandlerSelectors from '../../store/errorHandler/reducer';
import '../LoadListAnimation.css';
import * as userActions from '../../store/users/actions';
import * as globalActions from '../../store/global/actions';
import * as globalSelectors from '../../store/global/reducer';
import * as userSelectors from '../../store/users/reducer';
import * as constants from '../../constants';
import NoResults from '../../components/NoResults';
import ListView from '../../components/ListView';
import ElementMap from '../ElementMap';
import { withAlert } from 'react-alert';

export class UsersList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      userId: null,
      userName: null,
      start: undefined,
      end: undefined,
      status: undefined
    };
    this.toggle = this.toggle.bind(this);
    this.setUserDetails = this.setUserDetails.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  setUserDetails(userId = null, userName = null) {
    this.setState({ userId, userName });
  }

  onFormSubmit(start, end, status) {
    const filter_object = {
      userprofile: this.state.userId,
      status,
      format: 'csv'
    };
    filter_object[constants.FILTER_TIME_START] = start;
    filter_object[constants.FILTER_TIME_END] = end;
    this.props.exportSubmissions(filter_object, this.state.userName);
  }

  async componentDidMount() {
    this.props.showListTitle();
    this.props.changePageTitle('Users');
    this.props.changePageTitleButton('+ Create User');
    this.props.changePageTarget('/users/new');

    let { search } = qs.parse(this.props.location.search.slice(1));
    const { page } = qs.parse(this.props.location.search.slice(1));

    if (search === undefined) {
      search = '';
    }
    this.props.searchVal(search);
    let pageNumber = Number(page);

    if (isNaN(pageNumber)) {
      pageNumber = 1;
    }
    await this.props.fetchUsers(
      `${constants.API_ENDPOINT}/userprofiles/?ordering=${
        constants.TASK_SORT_FIELD
      }&search=${search}&page=${pageNumber}`
    );

    this.props.changePageNumber(pageNumber);
  }

  componentDidUpdate(prevProps) {
    let { search } = qs.parse(this.props.location.search.slice(1));
    if (search === undefined) {
      search = '';
    }
    const { page } = qs.parse(this.props.location.search.slice(1));
    if (Number(page) !== this.props.currentPage && !isNaN(page)) {
      const pageNumber = Number(page);
      this.props.fetchUsers(
        `${constants.API_ENDPOINT}/userprofiles/?ordering=${
          constants.TASK_SORT_FIELD
        }&search=${search}&page=${pageNumber}`
      );
      this.props.changePageNumber(pageNumber);
    }
    if (this.props.hasError !== prevProps.hasError) {
      if (this.props.hasError === true) {
        this.props.alert.show(this.props.errorMessage);
      }
    }
  }

  render() {
    if (this.props.searchParam !== '' && this.props.userCount === null) {
      return this.renderLoading();
    }
    if (this.props.userCount === 0) {
      return <NoResults searchVal={this.props.searchParam} endpoint="users" />;
    }
    if (this.props.rowsIdArray.length <= 0) return this.renderLoading();
    return (
      <div className="UsersList">
        <ListView
          renderHeaders={this.renderHeaders}
          rowsIdArray={this.props.rowsIdArray}
          rowsById={this.props.rowsById}
          renderRow={this.renderRow}
          endpoint="users"
          pageLinks={this.props.pageLinks}
          totalPages={this.props.totalPages}
          currentPage={this.props.currentPage}
          firstPage={this.props.firstPage}
          lastPage={this.props.lastPage}
          searchVal={this.props.searchParam}
          downloadModalHandler={this.toggle}
          modalState={this.state.modal}
          setUserDetails={this.setUserDetails}
          userName={this.state.userName}
          onFormSubmit={this.onFormSubmit}
          sortField={constants.USERS_SORT_ATTRIBUTE}
          sortOrder={constants.SORT_DESC}
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
    const headerItems = [
      'Role',
      'Username',
      'Last Name',
      'First Name',
      'Submissions',
      'Approved %',
      'Last Active Date'
    ];
    return <ElementMap items={headerItems} HTMLTag="th" />;
  }

  renderRow(row, toggleExportModalFunction = null, setUserDetails = null) {
    const rowItems = [
      row.attributes.role_display,
      <Link to={`/users/${row.id}`} key="link_to">
        {row.attributes.ona_username}
      </Link>,
      row.attributes.last_name,
      row.attributes.first_name,
      <div key={row.id}>
        {row.attributes.submission_count}
        {row.attributes.approved_submissions > 0 && (
          <Button
            className="mx-2 btn btn-sm btn-light white"
            aria-label="Export"
            onClick={function(event) {
              toggleExportModalFunction();
              setUserDetails(row.id, row.attributes.ona_username);
            }}
          >
            <FontAwesomeIcon icon="laptop" className="fa-xs icon-link withspace" />
          </Button>
        )}
      </div>,
      `${row.attributes.approval_rate * 100}%`,
      <Moment key={row.id} format="DD-MM-YYYY">
        {row.attributes.last_login}
      </Moment>
    ];

    return <ElementMap items={rowItems} HTMLTag="td" />;
  }
}

// which props do we want to inject, given the global store state?
function mapStateToProps(state) {
  return {
    rowsById: userSelectors.getUsersById(state),
    rowsIdArray: userSelectors.getUsersIdArray(state),
    totalPages: userSelectors.getTotalPages(state),
    currentPage: userSelectors.getCurrentPage(state),
    pageLinks: userSelectors.getPageLinks(state),
    firstPage: userSelectors.getFirstPage(state),
    lastPage: userSelectors.getLastPage(state),
    searchParam: globalSelectors.getSearchValue(state),
    userCount: userSelectors.getTotalCount(state),
    hasError: errorHandlerSelectors.getHasError(state),
    errorMessage: errorHandlerSelectors.getErrorMessage(state)
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      fetchUsers: userActions.fetchUsers,
      changePageNumber: userActions.changePageNumber,
      changePageTitle: globalActions.changePageTitle,
      changePageTitleButton: globalActions.changePageTitleButton,
      changePageTarget: globalActions.changePageTarget,
      showListTitle: globalActions.toggleDetailTitleOff,
      searchVal: globalActions.getSearchVal,
      exportSubmissions: userActions.exportSubmissions
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withAlert(UsersList));
