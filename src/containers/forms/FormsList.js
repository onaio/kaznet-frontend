import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import qs from 'qs';
import { Dropdown, DropdownToggle, DropdownItem, DropdownMenu } from 'reactstrap';

import '../LoadListAnimation.css';
import { withAlert } from 'react-alert';
import * as formActions from '../../store/forms/actions';
import * as formSelectors from '../../store/forms/reducer';
import * as globalSelectors from '../../store/global/reducer';
import * as globalActions from '../../store/global/actions';
import * as constants from '../../constants.js';
import * as errorHandlerSelectors from '../../store/errorHandler/reducer';
import ListView from '../../components/ListView';
import NoResults from '../../components/NoResults';
import ElementMap from '../ElementMap';
import MisconfiguredForm from '../../components/forms/MisconfiguredForm';

export class FormsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
    this.handleChange = this.handleChange.bind(this);
  }

  async componentDidMount() {
    this.props.showListTitle();
    this.props.changePageTitle('Forms');
    this.props.changePageTitleButton('');
    this.props.changePageTarget('');
    let { search } = qs.parse(this.props.location.search.slice(1));
    const { page } = qs.parse(this.props.location.search.slice(1));
    const { has_task } = qs.parse(this.props.location.search.slice(1));
    let hasTask;

    if (search === undefined) {
      search = '';
    }
    this.props.searchVal(search);

    if (has_task === undefined) {
      hasTask = '';
    } else {
      hasTask = has_task;
    }

    this.props.getHasTask(hasTask);

    let pageNumber = Number(page);

    if (isNaN(pageNumber)) {
      pageNumber = 1;
    }
    await this.props.fetchForms(
      `${constants.API_ENDPOINT}/forms/?ordering=${
        constants.FORM_SORT_FIELD
      }&search=${search}&page=${pageNumber}&has_task=${hasTask}`
    );
    this.props.changePageNumber(pageNumber);
  }

  componentDidUpdate(prevProps) {
    let { search } = qs.parse(this.props.location.search.slice(1));
    if (search === undefined) {
      search = '';
    }

    const { has_task } = qs.parse(this.props.location.search.slice(1));
    let hasTask;
    if (has_task === undefined) {
      hasTask = '';
    } else {
      hasTask = has_task;
    }

    const { page } = qs.parse(this.props.location.search.slice(1));

    if (Number(page) !== this.props.currentPage && !isNaN(page)) {
      const pageNumber = Number(page);
      this.props.fetchForms(
        `${constants.API_ENDPOINT}/forms/?ordering=${
          constants.FORM_SORT_FIELD
        }&search=${search}&page=${pageNumber}&has_task=${hasTask}`
      );
      this.props.changePageNumber(pageNumber);
    }
    if (this.props.hasError !== prevProps.hasError) {
      if (this.props.hasError === true) {
        this.props.alert.show(this.props.errorMessage);
      }
    }
  }

  handleChange(e) {
    const hasTask = e.target.getAttribute('data-key');
    const param = `?has_task=${hasTask}`;
    if (hasTask === null) {
      this.setState({
        isOpen: !this.state.isOpen
      });
      return false;
    }
    const pageValue = this.props.pageParam;
    const searchString = this.props.searchParam;
    this.props.fetchForms(
      `${constants.API_ENDPOINT}/forms/${
        hasTask !== '' ? param : ''
      }&search=${searchString}&page=${pageValue}`
    );
    this.props.getHasTask(hasTask !== '' ? hasTask : '');
    this.setState({
      isOpen: !this.state.isOpen
    });
    return true;
  }

  render() {
    if (this.props.searchParam !== '' && this.props.formCount === null) {
      return this.renderLoading();
    }
    if (this.props.formCount === 0) {
      return <NoResults searchVal={this.props.searchParam} endpoint="forms" />;
    }
    if (this.props.rowsIdArray.length <= 0) return this.renderLoading();
    return (
      <div className="FormsList">
        <ListView
          renderHeaders={this.renderHeaders}
          rowsIdArray={this.props.rowsIdArray}
          rowsById={this.props.rowsById}
          renderRow={this.renderRow}
          endpoint="forms"
          pageLinks={this.props.pageLinks}
          totalPages={this.props.totalPages}
          currentPage={this.props.currentPage}
          firstPage={this.props.firstPage}
          lastPage={this.props.lastPage}
          searchVal={this.props.searchParam}
          sortField={constants.FORM_SORT_FIELD}
          sortOrder={constants.SORT_DESC}
          isFormPage
          isOpen={this.state.isOpen}
          handleChange={this.handleChange}
          hasTask={this.props.hasTask}
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

  renderHeaders(firstPageLink) {
    const headerItems = [
      'Name',
      <Dropdown isOpen={this.isOpen} toggle={this.handleChange} key="dropdown">
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

  renderRow(row) {
    const rowItems = [
      <div key={row.id}>
        {row.attributes.title}
        {row.attributes.metadata.configuration_status !== constants.XFORM_CORRECTLY_CONFIGURED && (
          <MisconfiguredForm key={row.id} form={row} />
        )}
      </div>,
      row.attributes.task_name,
      <Moment key={row.id} format="DD-MM-YYYY HH:mm:ss">
        {row.attributes.modified}
      </Moment>
    ];
    return <ElementMap items={rowItems} HTMLTag="td" />;
  }
}

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
    pageParam: globalSelectors.getPageNum(state),
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withAlert(FormsList));
