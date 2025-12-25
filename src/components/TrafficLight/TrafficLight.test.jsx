// TrafficLight.test.jsx
import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { act } from 'react';
import TrafficLight from './TrafficLight';

describe('TrafficLight component', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
    cleanup();
  });

  test('initially shows red light on only', () => {
    const { container } = render(<TrafficLight />);

    const red = container.querySelector('#red-light');
    const yellow = container.querySelector('#yellow-light');
    const green = container.querySelector('#green-light');

    expect(red.classList.contains('red-on')).toBe(true);
    expect(yellow.classList.contains('yellow-on')).toBe(false);
    expect(green.classList.contains('green-on')).toBe(false);
  });

  test('keeps cycling through red -> yellow -> green -> red', () => {
    const { container } = render(<TrafficLight />);

    const getLights = () => ({
      red: container.querySelector('#red-light'),
      yellow: container.querySelector('#yellow-light'),
      green: container.querySelector('#green-light'),
    });

    // Initial: red
    let { red, yellow, green } = getLights();
    expect(red.classList.contains('red-on')).toBe(true);
    expect(yellow.classList.contains('yellow-on')).toBe(false);
    expect(green.classList.contains('green-on')).toBe(false);

    // After 3s -> yellow
    act(() => {
      jest.advanceTimersByTime(3000);
    });
    ({ red, yellow, green } = getLights());
    expect(red.classList.contains('red-on')).toBe(false);
    expect(yellow.classList.contains('yellow-on')).toBe(true);
    expect(green.classList.contains('green-on')).toBe(false);

    // After 1s -> green
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    ({ red, yellow, green } = getLights());
    expect(red.classList.contains('red-on')).toBe(false);
    expect(yellow.classList.contains('yellow-on')).toBe(false);
    expect(green.classList.contains('green-on')).toBe(true);

    // After 2s -> back to red
    act(() => {
      jest.advanceTimersByTime(2000);
    });
    ({ red, yellow, green } = getLights());
    expect(red.classList.contains('red-on')).toBe(true);
    expect(yellow.classList.contains('yellow-on')).toBe(false);
    expect(green.classList.contains('green-on')).toBe(false);
  });
});
