
window.addEventListener("DOMContentLoaded", function () {
    let allTabs = [];

    chrome.runtime.sendMessage({ type: "getTabs" }, response => {
        allTabs = response;

        const tabsList = document.querySelector("#ext_tabs");

        response.forEach(tab => {
            const tabElement = document.createElement("li");
            const titleElement = document.createElement("span");
            const button = document.createElement("button");

            titleElement.innerText = tab.title;

            if (tab.active) {
                tabElement.classList.add("active");
            }

            button.addEventListener("click", () => {
                chrome.tabs.remove(tab.id);
                tabElement.remove();
            });

            tabElement.addEventListener("click", () => {
                chrome.tabs.update(tab.id, { active: true });
            });

            button.innerText = "Close Tab";
            tabElement.appendChild(titleElement);
            tabElement.appendChild(button);
            tabsList.appendChild(tabElement);
        });
    });
});
