import { Gear } from '../src/Gear';

describe('Test Gear class', () => {
  test('cannot have gear with negative representation', () => {
    expect(() => {
      new Gear(-2);
    }).toThrowError(new Error('Negative representation of gear'));
  });

  test('should create next gear', () => {
    expect(new Gear(5)).toEqual(new Gear(4).next());
    expect(new Gear(3)).toEqual(new Gear(2).next());
    expect(new Gear(2)).toEqual(new Gear(1).next());
  });

  test('should create previous gear', () => {
    expect(new Gear(5)).toEqual(new Gear(6).previous());
    expect(new Gear(3)).toEqual(new Gear(4).previous());
    expect(new Gear(2)).toEqual(new Gear(3).previous());
  });
});
