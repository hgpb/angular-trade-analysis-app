import { HoursMinutesSecondsPipe } from './hms.pipe';

describe('HoursMinutesSecondsPipe', () => {
  let pipe: HoursMinutesSecondsPipe;

  beforeEach(() => {
    pipe = new HoursMinutesSecondsPipe();
  });

  it('should return an empty string if input is null', () => {
    expect (pipe.transform(null)).toEqual('');
  });

  it('should return empty string if input is undefined', () => {
    expect (pipe.transform(undefined)).toEqual('');
  });

  it('should return 00s when outside lowest allowed boundry value', () => {
    expect (pipe.transform(-1)).toEqual('00s');
  });

  it('should return 00s with lowest boundry value', () => {
    expect (pipe.transform(0)).toEqual('00s');
  });

  it('should return value that uses all parts of the format', () => {
    expect (pipe.transform(44105)).toEqual('12h 15m 04s');
  });

  it('should return 24h 00m 00s for highest allowed boundry value', () => {
    expect (pipe.transform(86400)).toEqual('24h 00m 00s');
  });

  it('should return > 24h when outside highest allowed boundry value', () => {
    expect (pipe.transform(86401)).toEqual('> 24h');
  });




});
