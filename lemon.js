function updateTabCounts(tabs) {
    let total = 0;
    let pinned = 0;
    for (const tab of tabs) {
        total++;
        if (tab.pinned) pinned++;
    }
    document.getElementById("total").innerHTML = total;
    document.getElementById("pinned").innerHTML = pinned;
    document.getElementById("non-pinned").innerHTML = total - pinned;
}

browser.tabs.query({}).then(updateTabCounts);
