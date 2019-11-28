import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import qs from 'qs';
import { Dropdown, DropdownToggle, DropdownItem, DropdownMenu } from 'reactstrap';
import PropTypes from 'prop-types';

import { withAlert } from 'react-alert';
import * as formActions from '../../store/forms/actions';
import * as formSelectors from '../../store/forms/reducer';
import * as globalSelectors from '../../store/global/reducer';
import * as globalActions from '../../store/global/actions';
import {
  SORT_DESC,
  FORM_SORT_FIELD,
  XFORM_CORRECTLY_CONFIGURED,
  API_ENDPOINT
} from '../../constants';
import * as errorHandlerSelectors from '../../store/errorHandler/reducer';
import ListView from '../../components/ListView';
import NoResults from '../../components/NoResults';
import ElementMap from '../ElementMap';
import MisconfiguredForm from '../../components/forms/MisconfiguredForm';
import Loading from '../../components/global/Loading';

function renderRow(row) {
  const rowItems = [
    <div key={row.id}>
      {row.attributes.title}
      {row.attributes.metadata.configuration_status !== XFORM_CORRECTLY_CONFIGURED && (
        <MisconfiguredForm key={row.id} form={row} />
      )}
    </div>,
    String(row.attributes.metadata.downloadable),
    row.attributes.task_name,
    <Moment key={row.id} format="DD-MM-YYYY HH:mm:ss">
      {row.attributes.modified}
    </Moment>
  ];
  return <ElementMap items={rowItems} HTMLTag="td" />;
}

function getFetchURL(search, hasTask, pageNumber) {
  return `${API_ENDPOINT}/forms/?ordering=${FORM_SORT_FIELD}&search=${search}&has_task=${hasTask}&page=${pageNumber}`;
}

export class FormsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.renderHeaders = this.renderHeaders.bind(this);
  }

  async componentDidMount() {
    const {
      showListTitle,
      changePageTitle,
      changePageTitleButton,
      changePageTarget,
      searchVal,
      getHasTask,
      fetchForms,
      changePageNumber,
      location
    } = this.props;

    showListTitle();
    changePageTitle('Forms');
    changePageTitleButton('');
    changePageTarget('');

    const { search = '' } = qs.parse(location.search.slice(1));
    const { page = 1 } = qs.parse(location.search.slice(1));
    const { has_task: hasTask = '' } = qs.parse(location.search.slice(1));
    const pageNumber = Number(page);

    searchVal(search);
    getHasTask(hasTask);

    const url = getFetchURL(search, hasTask, pageNumber);

    await fetchForms(url);
    changePageNumber(pageNumber);
  }

  componentDidUpdate(prevProps) {
    const {
      location,
      changePageNumber,
      errorMessage = '',
      hasError,
      currentPage = 1,
      alert,
      fetchForms
    } = this.props;
    const { hasError: prevHasError } = prevProps;

    const { search = '' } = qs.parse(location.search.slice(1));
    const { page = 1 } = qs.parse(location.search.slice(1));
    const { has_task: hasTask = '' } = qs.parse(location.search.slice(1));
    const pageNumber = Number(page);

    if (pageNumber !== currentPage) {
      const url = getFetchURL(search, hasTask, pageNumber);
      fetchForms(url);
      changePageNumber(pageNumber);
    }
    if (hasError !== prevHasError && hasError === true && errorMessage !== '') {
      alert.show(errorMessage);
    }
  }

  handleChange(e) {
    const hasTaskValue = e.target.getAttribute('data-key');
    const { isOpen: oldIsOpen } = this.state;
    const { fetchForms, getHasTask, pageValue, searchString } = this.props;

    if (hasTaskValue === null) {
      this.setState({
        isOpen: !oldIsOpen
      });
      return false;
    }

    const url = getFetchURL(searchString, hasTaskValue, pageValue);

    fetchForms(url);

    getHasTask(hasTaskValue !== '' ? hasTaskValue : '');

    this.setState({
      isOpen: !oldIsOpen
    });

    return true;
  }

  renderHeaders(firstPageLink) {
    const { isOpen } = this.state;

    const headerItems = [
      'Name',
      'Active',
      <Dropdown isOpen={isOpen} toggle={this.handleChange} key="dropdown">
        <DropdownToggle caret tag="span" className="nav-link">
          Task
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem key={0}>
            <Link to={`${firstPageLink}`} className="nav-link" key="1" data-key="2">
              All
            </Link>
          </DropdownItem>
          <DropdownItem key={1}>
            <Link to={`${firstPageLink}&has_task=true`} className="nav-link" key="1" data-key="1">
              Has Task
            </Link>
          </DropdownItem>
          <DropdownItem key={2}>
            <Link to={`${firstPageLink}&has_task=false`} className="nav-link" key="0" data-key="0">
              Does Not Have Task
            </Link>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>,
      'Last Modified'
    ];
    return <ElementMap items={headerItems} HTMLTag="th" />;
  }

  render() {
    const {
      searchParam,
      formCount,
      hasTask,
      rowsIdArray,
      rowsById,
      lastPage,
      pageLinks,
      totalPages,
      currentPage,
      firstPage
    } = this.props;
    const { isOpen } = this.state;

    if (searchParam !== '' && formCount === null) {
      return <Loading />;
    }
    if (formCount === 0) {
      return <NoResults searchVal={searchParam} endpoint="forms" />;
    }
    if (rowsIdArray.length <= 0) return <Loading />;
    return (
      <div className="FormsList">
        <ListView
          renderHeaders={this.renderHeaders}
          rowsIdArray={rowsIdArray}
          rowsById={rowsById}
          renderRow={renderRow}
          endpoint="forms"
          pageLinks={pageLinks}
          totalPages={totalPages}
          currentPage={currentPage}
          firstPage={firstPage}
          lastPage={lastPage}
          searchVal={searchParam}
          sortField={FORM_SORT_FIELD}
          sortOrder={SORT_DESC}
          isFormPage
          isOpen={isOpen}
          handleChange={this.handleChange}
          hasTask={hasTask}
        />
      </div>
    );
  }
}

FormsList.propTypes = {
  rowsById: PropTypes.objectOf(PropTypes.object).isRequired,
  rowsIdArray: PropTypes.arrayOf(PropTypes.string).isRequired,
  formCount: PropTypes.number,
  hasError: PropTypes.bool,
  errorMessage: PropTypes.string,
  hasTask: PropTypes.string,
  alert: PropTypes.objectOf(PropTypes.any),
  // search stuff
  searchString: PropTypes.string,
  location: PropTypes.objectOf(PropTypes.any),
  searchParam: PropTypes.string.isRequired,
  // page stuff
  pageValue: PropTypes.number,
  totalPages: PropTypes.number,
  currentPage: PropTypes.number,
  firstPage: PropTypes.number,
  lastPage: PropTypes.number,
  pageLinks: PropTypes.objectOf(PropTypes.string).isRequired,
  // functions
  fetchForms: PropTypes.func.isRequired,
  changePageNumber: PropTypes.func.isRequired,
  getHasTask: PropTypes.func.isRequired,
  changePageTitle: PropTypes.func.isRequired,
  changePageTitleButton: PropTypes.func.isRequired,
  changePageTarget: PropTypes.func.isRequired,
  showListTitle: PropTypes.func.isRequired,
  searchVal: PropTypes.func.isRequired
};

FormsList.defaultProps = {
  pageValue: 1,
  searchString: '',
  alert: {},
  location: {},
  totalPages: 1,
  currentPage: 1,
  firstPage: 1,
  lastPage: 1,
  formCount: null,
  hasError: false,
  errorMessage: '',
  hasTask: ''
};

function mapStateToProps(state) {
  return {
    rowsById: formSelectors.getFormsById(state),
    rowsIdArray: formSelectors.getFormsIdArray(state),
    totalPages: formSelectors.getTotalPages(state),
    currentPage: formSelectors.getCurrentPage(state),
    pageLinks: formSelectors.getPageLinks(state),
    firstPage: formSelectors.getFirstPage(state),
    lastPage: formSelectors.getLastPage(state),
    searchParam: globalSelectors.getSearchValue(state),
    formCount: formSelectors.getTotalCount(state),
    hasError: errorHandlerSelectors.getHasError(state),
    errorMessage: errorHandlerSelectors.getErrorMessage(state),
    hasTask: formSelectors.getHasTask(state)
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      fetchForms: formActions.fetchForms,
      changePageNumber: formActions.changePageNumber,
      getHasTask: formActions.getHasTask,
      changePageTitle: globalActions.changePageTitle,
      changePageTitleButton: globalActions.changePageTitleButton,
      changePageTarget: globalActions.changePageTarget,
      showListTitle: globalActions.toggleDetailTitleOff,
      searchVal: globalActions.getSearchVal
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(withAlert(FormsList));
