// Smart component that renders the page title section
import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as globalSelectors from '../../store/global/reducer';

import PageTitle from '../../components/page/PageTitle';


class TitleSection extends Component {

    render() {
        return(
            <PageTitle
                pageTitle={this.props.pageTitle}
                pageTitleButton={this.props.pageTitleButton}
            />
        );
    }

}

// which props do we want to inject, given the global store state?
function mapStateToProps(state) {
    return {
        pageTitle : globalSelectors.getPageTitle(state),
        pageTitleButton : globalSelectors.getPageTitleButton(state)
    };
}

export default connect(mapStateToProps)(TitleSection);