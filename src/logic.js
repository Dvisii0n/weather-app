const API_KEY = "USPQGAPMKBYC9ZM3K8NVMNL9L";

export default async function getWeather(location, unit) {
    try {
        const response = await fetch(
            `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location.toLowerCase()}?unitGroup=${unit}&key=${API_KEY}&contentType=json`
        );
        const data = await response.json();
        const todays = data.days[0];

        const address = data.address;
        const temperature = todays.temp;
        const conditions = todays.conditions;
        const feelsLike = todays.feelslike;
        const windSpeed = todays.windspeed;
        const humidity = todays.humidity;

        return {
            address,
            temperature,
            conditions,
            feelsLike,
            windSpeed,
            humidity,
        };
    } catch (error) {
        throw error;
    }
}
