// Smart component that renders the page title section
import React, { Component } from "react";
import { connect } from "react-redux";

import * as globalSelectors from "../../store/global/reducer";

import PageTitle from "../../components/page/PageTitle";
import DetailPageTitle from "../../components/page/DetailTitle";

export class TitleSection extends Component {
  render() {
    if (this.props.showTitle) {
      if (!this.props.showDetail) {
        return (
          <PageTitle
            pageTitle={this.props.pageTitle}
            pageTitleButton={this.props.pageTitleButton}
            pageTarget={this.props.pageTarget}
          />
        );
      } else {
        return (
          <DetailPageTitle
            pageTitle={this.props.pageTitle}
            detailName={this.props.detailName}
          />
        );
      }
    }
    return null;
  }
}

// which props do we want to inject, given the global store state?
function mapStateToProps(state) {
  return {
    pageTitle: globalSelectors.getPageTitle(state),
    pageTitleButton: globalSelectors.getPageTitleButton(state),
    pageTarget: globalSelectors.getPageTarget(state),
    showTitle: !globalSelectors.getNoTitle(state),
    showDetail: globalSelectors.getShowDetail(state),
    detailName: globalSelectors.getDetailName(state)
  };
}

export default connect(mapStateToProps)(TitleSection);
