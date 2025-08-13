const API_KEY = "USPQGAPMKBYC9ZM3K8NVMNL9L";

function capitalize(string) {
    const arr = string.split("");
    arr[0] = arr[0].toUpperCase();
    return arr.join("");
}

function reformatDate(format, date) {
    const arr = date.split("-");
    const day = arr[2];
    const month = arr[1];
    const year = arr[0];
    return format === "metric"
        ? `${day}/${month}/${year}`
        : `${month}/${day}/${year}`;
}

export default async function getWeather(location, units) {
    const isMetric = units === "metric";

    try {
        const response = await fetch(
            `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location.toLowerCase()}?unitGroup=${units}&key=${API_KEY}&contentType=json`
        );
        const data = await response.json();
        const todays = data.days[0];

        const date = isMetric
            ? reformatDate("metric", todays.datetime)
            : reformatDate("us", todays.datetime);
        const address = capitalize(data.address);
        const temperature = isMetric
            ? `${todays.temp} °C`
            : `${todays.temp} °F`;
        const conditions = todays.conditions;
        const feelsLike = isMetric
            ? `Feels like ${todays.feelslike} °C`
            : `Feels like ${todays.feelslike} °F`;
        const windSpeed = isMetric
            ? `Windspeed: ${todays.windspeed} km/h`
            : `Windspeed: ${todays.windspeed} mph`;
        const humidity = `Humidity: ${todays.humidity}%`;
        const icon = todays.icon;

        return {
            icon,
            date,
            address,
            temperature,
            conditions,
            feelsLike,
            windSpeed,
            humidity,
        };
    } catch (error) {
        alert(`ERROR: Response failed`);
    }
}
