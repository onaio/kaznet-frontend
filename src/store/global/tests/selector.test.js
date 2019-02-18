// global selector tests
import Immutable from 'seamless-immutable';
import { Selector } from 'redux-testkit';

import * as global from '../reducer';

const emptyState = Immutable({
  global: {
    pageTitle: 'Kaznet',
    pageTitleButton: 'Friendly Button',
    pageTarget: '/',
    noTitle: false,
    showDetail: false,
    detailName: null,
    actionLinks: [],
    detailStatus: null,
    searchVal: ''
  }
});

describe('store/global/selectors', () => {
  it('should get default page title when empty', () => {
    Selector(global.getPageTitle)
      .expect(emptyState)
      .toReturn('Kaznet');
  });

  it('should get search value when empty', () => {
    Selector(global.getSearchValue)
      .expect(emptyState)
      .toReturn('');
  });

  it('should get default page title button when empty', () => {
    Selector(global.getPageTitleButton)
      .expect(emptyState)
      .toReturn('Friendly Button');
  });

  it('should get default page target when empty', () => {
    Selector(global.getPageTarget)
      .expect(emptyState)
      .toReturn('/');
  });

  it('should get default actionLinks when empty', () => {
    Selector(global.getActionLinks)
      .expect(emptyState)
      .toReturn([]);
  });

  it('should get default noTitle when empty', () => {
    Selector(global.getNoTitle)
      .expect(emptyState)
      .toReturn(false);
  });

  it('should get default detailStatus when empty', () => {
    Selector(global.getDetailStatus)
      .expect(emptyState)
      .toReturn(null);
  });

  it('should get default showDetail when empty', () => {
    Selector(global.getShowDetail)
      .expect(emptyState)
      .toReturn(false);
  });

  it('should get default detailName when empty', () => {
    Selector(global.getDetailName)
      .expect(emptyState)
      .toReturn(null);
  });
});
