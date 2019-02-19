import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import qs from 'qs';
import '../LoadListAnimation.css';
import { withAlert } from 'react-alert';
import * as clientActions from '../../store/clients/actions';
import * as clientSelectors from '../../store/clients/reducer';
import * as globalSelectors from '../../store/global/reducer';
import * as globalActions from '../../store/global/actions';
import * as constants from '../../constants';
import * as errorHandlerSelectors from '../../store/errorHandler/reducer';
import ListView from '../../components/ListView';
import NoResults from '../../components/NoResults';
import ElementMap from '../ElementMap';

export class ClientsList extends Component {
  async componentDidMount() {
    this.props.showListTitle();
    this.props.changePageTitle('Clients');
    this.props.changePageTitleButton('+ Add Client');
    this.props.changePageTarget('/clients/new');
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
    await this.props.fetchClients(
      `${constants.API_ENDPOINT}/clients/?ordering=${
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
      this.props.fetchClients(
        `${constants.API_ENDPOINT}/clients/?ordering=${
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
    if (this.props.searchParam !== '' && this.props.clientCount === null) {
      return this.renderLoading();
    }
    if (this.props.clientCount === 0) {
      return <NoResults searchVal={this.props.searchParam} endpoint="clients" />;
    }
    if (this.props.rowsIdArray.length <= 0) return this.renderLoading();
    return (
      <div className="ClientsList">
        <ListView
          renderHeaders={this.renderHeaders}
          rowsIdArray={this.props.rowsIdArray}
          rowsById={this.props.rowsById}
          renderRow={this.renderRow}
          endpoint="clients"
          pageLinks={this.props.pageLinks}
          totalPages={this.props.totalPages}
          currentPage={this.props.currentPage}
          firstPage={this.props.firstPage}
          lastPage={this.props.lastPage}
          searchVal={this.props.searchParam}
          sortField={constants.CLIENT_SORT_ATTRIBUTE}
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
    const headerItems = ['Name', 'Created'];
    return <ElementMap items={headerItems} HTMLTag="th" />;
  }

  renderRow(row) {
    const rowItems = [
      <Link to={`/clients/edit/${row.id}`} key="link_to">
        {row.attributes.name}
      </Link>,
      <Moment key={row.id} format="DD-MM-YYYY">
        {row.attributes.created}
      </Moment>
    ];
    return <ElementMap items={rowItems} HTMLTag="td" />;
  }
}

function mapStateToProps(state) {
  return {
    rowsById: clientSelectors.getClientsById(state),
    rowsIdArray: clientSelectors.getClientsIdArray(state),
    totalPages: clientSelectors.getTotalPages(state),
    currentPage: clientSelectors.getCurrentPage(state),
    pageLinks: clientSelectors.getPageLinks(state),
    firstPage: clientSelectors.getFirstPage(state),
    lastPage: clientSelectors.getLastPage(state),
    searchParam: globalSelectors.getSearchValue(state),
    clientCount: clientSelectors.getTotalCount(state),
    hasError: errorHandlerSelectors.getHasError(state),
    errorMessage: errorHandlerSelectors.getErrorMessage(state)
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      fetchClients: clientActions.fetchClients,
      changePageNumber: clientActions.changePageNumber,
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
)(withAlert(ClientsList));
