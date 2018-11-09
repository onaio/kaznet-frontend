import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import qs from "qs";
import "../LoadListAnimation.css";
import * as formActions from "../../store/forms/actions";
import * as formSelectors from "../../store/forms/reducer";
import * as globalSelectors from "../../store/global/reducer";
import * as globalActions from "../../store/global/actions";
import * as constants from "../../constants.js";
import * as errorHandlerSelectors from "../../store/errorHandler/reducer";
import ListView from "../../components/ListView";
import NoResults from "../../components/NoResults";
import ElementMap from "../ElementMap";
import { withAlert } from "react-alert";

export class FormsList extends Component {
  async componentDidMount() {
    this.props.showListTitle();
    this.props.changePageTitle("Forms");
    this.props.changePageTitleButton("");
    this.props.changePageTarget("");
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
    await this.props.fetchForms(
      `${constants.API_ENDPOINT}/forms/?ordering=${
        constants.FORM_SORT_FIELD
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
      this.props.fetchForms(
        `${constants.API_ENDPOINT}/forms/?ordering=${
          constants.FORM_SORT_FIELD
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
    if (this.props.searchParam !== "" && this.props.formCount === null) {
      return this.renderLoading();
    }
    if (this.props.formCount === 0) {
      return (
        <NoResults searchVal={this.props.searchParam} endpoint={"forms"} />
      );
    }
    if (this.props.rowsIdArray.length <= 0) return this.renderLoading();
    return (
      <div className="FormsList">
        <ListView
          renderHeaders={this.renderHeaders}
          rowsIdArray={this.props.rowsIdArray}
          rowsById={this.props.rowsById}
          renderRow={this.renderRow}
          endpoint={"forms"}
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
    const headerItems = ["Name", "Task", "Last Modified"];
    return <ElementMap items={headerItems} HTMLTag="th" />;
  }

  renderRow(row) {
    const rowItems = [
      row.attributes.title,
      row.attributes.task_name,
      <Moment key={row.id} format="DD-MM-YYYY">
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
    errorMessage: errorHandlerSelectors.getErrorMessage(state)
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      fetchForms: formActions.fetchForms,
      changePageNumber: formActions.changePageNumber,
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
