import { describe, it, expect } from 'vitest';
import { buildHourlyList, buildDailyList } from './weatherUtils';


function double(n) {
    return n * 2;
}

const fakeDaily = {
    time: ["2026-01-01", "2026-01-01"],
    weather_code:[0, 61],
    temperature_2m_max: [5, 20],
    temperature_2m_min: [10, 30]
}

const fakeHourly = {
    time: ["2026-01-01T00:00", "2026-01-01T15:00"],
    temperature_2m: [5, 20],
    weather_code: [0, 61]
};

describe('maths helpers', () => {
    it('adds two numbers correctly', () => {
        expect(2+3).toBe(5);
    });

    it('multiplies two numbers correctly', () => {
        expect(double(5)).toBe(10)
    });
});

describe('checking an array', () => {
    it('checks the number of item in an array', () => {
        expect(buildHourlyList(fakeHourly).length).toBe(2);
    });

    it('checks the exact items in an array', () => {
        expect(buildHourlyList(fakeHourly)[0].degree).toBe(5);
    });

    it('checks the value in the daily list', () => {
        expect(buildDailyList(fakeDaily)[1].high).toBe(20);
    });
});

