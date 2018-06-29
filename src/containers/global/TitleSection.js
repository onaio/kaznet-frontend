// Smart component that renders the page title section
import React, { Component } from "react";
import { connect } from "react-redux";

import * as globalSelectors from "../../store/global/reducer";

import PageTitle from "../../components/page/PageTitle";
import DetailPageTitle from "../../components/page/DetailTitle";

export class TitleSection extends Component {
  render() {
    if (!globalSelectors.getNoTitle) {
      if (!globalSelectors.getShowDetail) {
        return (
          <PageTitle
            pageTitle={this.props.pageTitle}
            pageTitleButton={this.props.pageTitleButton}
            pageTarget={this.props.pageTarget}
          />
        );
      } else {
        return <DetailPageTitle />;
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
    pageTarget: globalSelectors.getPageTarget(state)
  };
}

export default connect(mapStateToProps)(TitleSection);
