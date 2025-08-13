import getWeather from "./logic";

const fakeDelay = 1000;

class UIBuilder {
    constructor() {
        this.body = document.querySelector("body");
    }

    createContainerWithChilds(className, childs) {
        const container = document.createElement("div");
        container.className = className;

        Object.keys(childs).forEach((key) => {
            const child = document.createElement("div");
            child.className = key;
            child.textContent = childs[key];
            container.appendChild(child);
        });

        return container;
    }
}

export default class App extends UIBuilder {
    constructor() {
        super();
        this.form = document.querySelector("form");
        this.weatherContainerClass = "weather-container";
        this.loadingImg = document.querySelector(".mike");
    }

    #getInputData() {
        const formData = new FormData(this.form);
        const inputData = formData.get("search-bar");
        this.form.reset();
        return inputData;
    }

    refresh() {
        const container = document.querySelector(
            `.${this.weatherContainerClass}`
        );

        if (container) {
            this.body.removeChild(container);
            this.loadingImg.classList.toggle("visible");
        }
    }

    async addWeatherContainer(units) {
        const location = this.#getInputData();
        if (location) {
            setTimeout(async () => {
                const data = await getWeather(location, units);
                if (data) {
                    const weatherContainer = this.createContainerWithChilds(
                        this.weatherContainerClass,
                        data
                    );
                    weatherContainer.classList.add(data.icon);
                    weatherContainer.querySelector(".icon").textContent = "";
                    this.body.appendChild(weatherContainer);
                    this.loadingImg.classList.toggle("visible");
                } else {
                    alert("That location doesn't exist dumbass");
                }
            }, fakeDelay);
        } else {
            alert("Please enter a valid location");
        }
    }

    async run() {
        this.form.addEventListener("submit", async (event) => {
            event.preventDefault();
            this.refresh();
            const units = document.querySelector('input[type="checkbox"]')
                .checked
                ? "us"
                : "metric";
            this.addWeatherContainer(units);
        });
    }
}
