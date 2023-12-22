// co/nsole.log(chrome.tabs);
window.addEventListener("DOMContentLoaded", function(){
    // console.log("DOM fully loaded and parsed");
    // const tabs = document.querySelector("#ext_tabs");

    let allTabs = [];
    chrome.runtime.sendMessage({ type: "getTabs" }, response => {
        // console.log(response);
        allTabs = response;
        response.forEach((tab, index) => {
            const tabs = document.querySelector("#ext_tabs");
            console.log(tabs);
            const tabElement = document.createElement("li");
            const p = this.document.createElement("p");
            p.innerText = tab.title;
            const button = this.document.createElement("button");
            if(tab.active){
                tabElement.classList.add("active");
            }
            button.addEventListener("click", ()=>{
                chrome.tabs.remove(tab.id);
                tabElement.remove();
            });
            p.addEventListener("click", () => {
                chrome.tabs.update(tab.id, { active: true});
                // window.close();
            });
            button.innerText = "Close Tab";
            tabElement.appendChild(p);
            tabElement.appendChild(button);
            tabs.appendChild(tabElement);
        });
    });

});