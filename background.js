browser.storage.local.set({"tab log": []});

updateTabLog();

function updateTabLog() {
    setTimeout(async function() {
        let tabLog = (await browser.storage.local.get("tab log"))["tab log"];
        const obj = [Date.now(), (await browser.tabs.query({})).length];
        tabLog.push(obj);
        await browser.storage.local.set({"tab log": tabLog});
    }, 500);
}

browser.tabs.onCreated.addListener((tab) => {
    updateTabLog();
});

browser.tabs.onRemoved.addListener((tabId, removeInfo) => {
    if (removeInfo.isWindowClosing)
        return;
    updateTabLog();
});
