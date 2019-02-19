// Smart component that renders the Locations List view
import React, { Component } from 'react';
import voca from 'voca';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import qs from 'qs';
import * as locationActions from '../../store/locations/actions';
import * as locationSelectors from '../../store/locations/reducer';
import * as globalActions from '../../store/global/actions';
import * as globalSelectors from '../../store/global/reducer';
import * as errorHandlerSelectors from '../../store/errorHandler/reducer';
import * as constants from '../../constants';
import '../LoadListAnimation.css';
import ListView from '../../components/ListView';
import NoResults from '../../components/NoResults';
import ElementMap from '../ElementMap';
import { withAlert } from 'react-alert';

export class LocationsList extends Component {
  async componentDidMount() {
    this.props.showListTitle();
    this.props.changePageTitle('Locations');
    this.props.changePageTitleButton('+ Create Location');
    this.props.changePageTarget('/locations/new');

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

    await this.props.fetchLocations(
      `${constants.API_ENDPOINT}/locations/?ordering=${
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
      this.props.fetchLocations(
        `${constants.API_ENDPOINT}/locations/?ordering=${
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
    if (this.props.searchParam !== '' && this.props.locationCount === null) {
      return this.renderLoading();
    }
    if (this.props.locationCount === 0) {
      return <NoResults searchVal={this.props.searchParam} endpoint="locations" />;
    }
    if (this.props.rowsIdArray.length <= 0) return this.renderLoading();
    return (
      <div className="LocationList">
        <ListView
          renderHeaders={this.renderHeaders}
          rowsIdArray={this.props.rowsIdArray}
          rowsById={this.props.rowsById}
          renderRow={this.renderRow}
          endpoint="locations"
          pageLinks={this.props.pageLinks}
          totalPages={this.props.totalPages}
          currentPage={this.props.currentPage}
          firstPage={this.props.firstPage}
          lastPage={this.props.lastPage}
          searchVal={this.props.searchParam}
          sortField={constants.LOCATION_SORT_ATTRIBUTE}
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
      <Link to={`/locations/${row.id}`} key="link_to">
        {row.attributes.name}
      </Link>,
      row.attributes.parent_name,
      row.attributes.location_type_name,
      voca.truncate(row.attributes.description, 60)
    ];
    return <ElementMap items={rowItems} HTMLTag="td" />;
  }

  renderHeaders() {
    const headerItems = ['Name', 'Parent', 'Type', 'Description'];
    return <ElementMap items={headerItems} HTMLTag="th" />;
  }
}

function mapStateToProps(state) {
  return {
    rowsById: locationSelectors.getLocationsById(state),
    rowsIdArray: locationSelectors.getLocationsIdArray(state),
    totalPages: locationSelectors.getTotalPages(state),
    currentPage: locationSelectors.getCurrentPage(state),
    pageLinks: locationSelectors.getPageLinks(state),
    firstPage: locationSelectors.getFirstPage(state),
    lastPage: locationSelectors.getLastPage(state),
    searchParam: globalSelectors.getSearchValue(state),
    locationCount: locationSelectors.getTotalCount(state),
    hasError: errorHandlerSelectors.getHasError(state),
    errorMessage: errorHandlerSelectors.getErrorMessage(state)
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      fetchLocations: locationActions.fetchLocations,
      changePageNumber: locationActions.changePageNumber,
      changePageTitle: globalActions.changePageTitle,
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
)(withAlert(LocationsList));
