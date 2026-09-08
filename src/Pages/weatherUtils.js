export function buildHourlyList(hourly) {
    return hourly.time.map((t, index) => ({
        time: new Date(t).toLocaleTimeString('en-US', { hour: 'numeric', hour12: true }),
        degree: hourly.temperature_2m[index],
        code: hourly.weather_code[index],
        id: index,
        date: new Date(t).toLocaleDateString('en-US', { weekday: 'long' })
    }));
}

export function buildDailyList(daily) {
    return daily.time.map((t, index) => ({
        id: index,
        code: daily.weather_code[index],
        high: daily.temperature_2m_max[index],
        low: daily.temperature_2m_min[index],
        day: new Date(t).toLocaleDateString('en-US', { weekday: 'short' })
    }));
}