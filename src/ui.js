import getWeather from "./logic";

class UIBuilder {
    constructor() {}
}

export default class App {
    constructor() {
        this.builder = new UIBuilder();
        this.form = document.querySelector("form");
    }

    #getInputData() {
        const formData = new FormData(this.form);
        const inputData = formData.get("search-bar");
        this.form.reset();
        return inputData;
    }

    async run() {
        this.form.addEventListener("submit", async (event) => {
            event.preventDefault();
            const location = this.#getInputData();
            const data = await getWeather(location, "metric");
            console.log(data);
        });
    }
}
