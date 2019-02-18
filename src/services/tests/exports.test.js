import ExportService from '../exports';

import * as fixtures from '../../store/users/tests/fixtures';

global.fetch = require('jest-fetch-mock');

describe('services/exports', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  it('should handle default export http errors given bad filter data', async () => {
    fetch.mockResponseOnce(JSON.stringify({}), { status: 500 });
    let error;
    try {
      await ExportService.exportSubmissions(fixtures.badExportFilter);
    } catch (e) {
      error = e;
    }
    expect(error).toEqual(new Error('Submission Export Failed, HTTP status 500'));
  });
});
