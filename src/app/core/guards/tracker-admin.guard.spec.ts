import { TestBed } from '@angular/core/testing';

import { TrackerAdminGuard } from './tracker-admin.guard';

describe('TrackerAdminGuard', () => {
  let guard: TrackerAdminGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(TrackerAdminGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
