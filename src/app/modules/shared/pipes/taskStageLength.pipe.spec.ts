import { TaskStageLengthPipe } from './taskStageLength.pipe';

describe('TestPipe', () => {
  it('create an instance', () => {
    const pipe = new TaskStageLengthPipe();
    expect(pipe).toBeTruthy();
  });
});
