import Chart from 'chart.js/auto';
import 'chartjs-adapter-date-fns';

function updateTabCounts(tabs) {
    let total = 0;
    let pinned = 0;
    for (const tab of tabs) {
        total++;
        if (tab.pinned) pinned++;
    }
    document.getElementById("total").innerText = total;
    document.getElementById("pinned").innerText = pinned;
    document.getElementById("non-pinned").innerText = total - pinned;
}

browser.tabs.query({}).then((tabs) => {
    document.getElementById("total").innerText = tabs.length;
});

browser.storage.local.get("tab log").then((results) => {
    const tabLog = results["tab log"];
    console.log(tabLog);
    new Chart(
        document.getElementById('graph'),
        {
            type: 'line',
            options: {
                scales: {
                    x: {
                        type: 'time',
                        time: {
                            unit: 'minute'
                        }
                    },
                    y: {
                        //min: 0,
                    }
                },
                animation: false,
                elements: {
                    point: {
                        pointStyle: 'star'
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    }
                }
            },

            data: {
                labels: tabLog.map((i) => i[0]),
                datasets: [{
                    label: "open tabs",
                    data: tabLog,
                    // TODO: remember how to move these aesthetic options to options
                    fill: false,
                    borderColor: 'green',
                    tension: 0.25 // changes the squibbliness 📉
                }]
            }
        }
    );
});
