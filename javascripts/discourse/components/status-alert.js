import Component from "@ember/component";
const API_ENDPOINT = "https://devhub.instatus.com/summary.json";
const API_INFO = "https://devhub.instatus.com";

export default Component.extend({
    showStatus: null,
    statusText: null,
    statusHref: null,
    indicator: null,

    init() {
        this._super(...arguments);
        this.set("statusHref", API_INFO.replace(/http(s)*:\/\//g, ""));

        if (settings.failed_status_text) {
            this.set("showStatus", true);
            this.set("statusMessage", settings.test_status_message);
            this.set("indicator", settings.test_status_indicator);
        } else {
            try {
                fetch(API_ENDPOINT)
                .then(response => response.json())
                .then(data => {

                    let { status } = data.page.status;

                    let type = status == "HASISSUES" ? "hasissues" : "undermaintenance";
                    let message = status == "HASISSUES" ? settings.has_issues_message : settings.under_maintenance_message;

                    if (status !== "UP") {
                        this.set("indicator", type);
                        this.set("statusMessage", message);
                        this.set("showStatus", true);
                    }
                })
            } catch (err) {
                console.warn(err)
            }
        }
    }
})