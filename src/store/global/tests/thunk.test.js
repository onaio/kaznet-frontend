// global thunk tests
import { Thunk } from 'redux-testkit';

import * as global from '../actions';

describe('store/topics/actions', () => {
  it('should set page title', async () => {
    const dispatches = await Thunk(global.changePageTitle).execute('Fancy Title');
    expect(dispatches.length).toBe(1);
    expect(dispatches[0].getAction()).toEqual({
      pageTitle: 'Fancy Title',
      type: 'global.CHANGE_PAGETITLE'
    });
  });

  it('should set search value', async () => {
    const dispatches = await Thunk(global.getSearchVal).execute('ilri');
    expect(dispatches.length).toBe(1);
    expect(dispatches[0].getAction()).toEqual({
      searchVal: 'ilri',
      type: 'global.GLOBAL_SEARCH_VALUE'
    });
  });

  it('should set page title button', async () => {
    const dispatches = await Thunk(global.changePageTitleButton).execute('Fancy Button');
    expect(dispatches.length).toBe(1);
    expect(dispatches[0].getAction()).toEqual({
      pageTitleButton: 'Fancy Button',
      type: 'global.CHANGE_PAGETITLE_BUTTON'
    });
  });

  it('should change Detail Status', async () => {
    const dispatches = await Thunk(global.changeDetailStatus).execute('Active');
    expect(dispatches.length).toBe(1);
    expect(dispatches[0].getAction()).toEqual({
      detailStatus: 'Active',
      type: 'global.CHANGE_DETAIL_STATUS'
    });
  });

  it('should set Page Action Links', async () => {
    const dispatches = await Thunk(global.setPageActionLinks).execute(['link']);
    expect(dispatches.length).toBe(1);
    expect(dispatches[0].getAction()).toEqual({
      actionLinks: ['link'],
      type: 'global.SET_ACTION_LINKS'
    });
  });

  it('should toggle Detail Title On', async () => {
    const dispatches = await Thunk(global.toggleDetailTitleOn).execute('Name A');
    expect(dispatches.length).toBe(1);
    expect(dispatches[0].getAction()).toEqual({
      detailName: 'Name A',
      type: 'global.TOGGLE_DETAIL_TITLE_ON'
    });
  });

  it('should toggle Detail Title Off', async () => {
    const dispatches = await Thunk(global.toggleDetailTitleOff).execute();
    expect(dispatches.length).toBe(1);
    expect(dispatches[0].getAction()).toEqual({
      type: 'global.TOGGLE_DETAIL_TITLE_OFF'
    });
  });

  it('should toggle Title On', async () => {
    const dispatches = await Thunk(global.toggleTitleOn).execute();
    expect(dispatches.length).toBe(1);
    expect(dispatches[0].getAction()).toEqual({
      type: 'global.PAGE_TITLE_ON'
    });
  });

  it('should toggle Title Off', async () => {
    const dispatches = await Thunk(global.toggleTitleOff).execute();
    expect(dispatches.length).toBe(1);
    expect(dispatches[0].getAction()).toEqual({
      type: 'global.PAGE_TITLE_OFF'
    });
  });

  it('should set page target', async () => {
    const dispatches = await Thunk(global.changePageTarget).execute('/tasks/new');
    expect(dispatches.length).toBe(1);
    expect(dispatches[0].getAction()).toEqual({
      pageTarget: '/tasks/new',
      type: 'global.CHANGE_PAGE_TARGET'
    });
  });
});
