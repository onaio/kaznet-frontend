// Smart component that renders the LocationTypes List view
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import qs from 'qs';
import { withAlert } from 'react-alert';
import * as constants from '../../constants';
import * as locationTypeActions from '../../store/locationTypes/actions';
import * as locationTypeSelectors from '../../store/locationTypes/reducer';
import * as globalActions from '../../store/global/actions';
import * as globalSelectors from '../../store/global/reducer';
import * as errorHandlerSelectors from '../../store/errorHandler/reducer';
import NoResults from '../../components/NoResults';
import ListView from '../../components/ListView';
import ElementMap from '../ElementMap';

export class LocationTypesList extends Component {
  async componentDidMount() {
    this.props.showListTitle();
    this.props.fetchLocationTypes();
    this.props.changePageTitle('Location Types');
    this.props.changePageTitleButton('+ Create Location Type');
    this.props.changePageTarget('/locationTypes/new');
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

    await this.props.fetchLocationTypes(
      `${constants.API_ENDPOINT}/locationtypes/?ordering=${
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
      this.props.fetchLocationTypes(
        `${constants.API_ENDPOINT}/locationtypes/?ordering=${
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
    if (this.props.searchParam !== '' && this.props.locationTypeCount === null) {
      return this.renderLoading();
    }
    if (this.props.locationTypeCount === 0) {
      return <NoResults searchVal={this.props.searchParam} endpoint="locationtypes" />;
    }
    if (this.props.rowsIdArray.length <= 0) return this.renderLoading();
    return (
      <div className="LocationTypeList">
        <ListView
          renderHeaders={this.renderHeaders}
          rowsIdArray={this.props.rowsIdArray}
          rowsById={this.props.rowsById}
          renderRow={this.renderRow}
          endpoint="locationtypes"
          pageLinks={this.props.pageLinks}
          totalPages={this.props.totalPages}
          currentPage={this.props.currentPage}
          firstPage={this.props.firstPage}
          lastPage={this.props.lastPage}
          searchVal={this.props.searchParam}
          sortField={constants.LOCATION_TYPE_SORT_ATTRIBUTE}
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

  renderRow(row) {
    const rowItems = [
      <Link to={`/locationTypes/edit/${row.id}`} key="link_to">
        {row.attributes.name}
      </Link>
    ];
    return <ElementMap items={rowItems} HTMLTag="td" />;
  }

  renderHeaders() {
    const headerItems = ['Name'];
    return <ElementMap items={headerItems} HTMLTag="th" />;
  }
}

function mapStateToProps(state) {
  return {
    rowsById: locationTypeSelectors.getLocationTypesById(state),
    rowsIdArray: locationTypeSelectors.getLocationTypesIdArray(state),
    totalPages: locationTypeSelectors.getTotalPages(state),
    currentPage: locationTypeSelectors.getCurrentPage(state),
    pageLinks: locationTypeSelectors.getPageLinks(state),
    firstPage: locationTypeSelectors.getFirstPage(state),
    lastPage: locationTypeSelectors.getLastPage(state),
    searchParam: globalSelectors.getSearchValue(state),
    locationTypeCount: locationTypeSelectors.getTotalCount(state),
    hasError: errorHandlerSelectors.getHasError(state),
    errorMessage: errorHandlerSelectors.getErrorMessage(state)
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      fetchLocationTypes: locationTypeActions.fetchLocationTypes,
      changePageTitle: globalActions.changePageTitle,
      changePageNumber: locationTypeActions.changePageNumber,
      changePageTitleButton: globalActions.changePageTitleButton,
      showListTitle: globalActions.toggleDetailTitleOff,
      changePageTarget: globalActions.changePageTarget,
      searchVal: globalActions.getSearchVal
    },

    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withAlert(LocationTypesList));
