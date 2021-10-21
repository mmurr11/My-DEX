document.addEventListener('DOMContentLoaded', function () {

    const list = document.getElementById('metric_list')
    const xhr1 = new XMLHttpRequest();
    const xhr2 = new XMLHttpRequest();
    const xhr3 = new XMLHttpRequest();
    const xhr4 = new XMLHttpRequest();
    xhr1.open("GET", 'https://community-api.coinmetrics.io/v4/timeseries/asset-metrics?assets=btc&metrics=FlowInExNtv', true);
    xhr2.open("GET", 'https://community-api.coinmetrics.io/v4/timeseries/asset-metrics?assets=btc&metrics=FlowOutExNtv', true);
    xhr3.open("GET", 'https://community-api.coinmetrics.io/v4/timeseries/asset-metrics?assets=eth&metrics=FlowInExNtv', true);
    xhr4.open("GET", 'https://community-api.coinmetrics.io/v4/timeseries/asset-metrics?assets=eth&metrics=FlowOutExNtv', true);
    var todaysBtcInflow, todaysBtcOutflow, todaysEthInflow, todaysEthOutflow;
    let netFlows = new Array;
    xhr1.onload = function () {
        if (this.status === 200) {
            let obj = JSON.parse(this.responseText);
            let data = obj['data']
            let mostRecentSnippet = data[99]
            todaysBtcInflow = mostRecentSnippet['FlowInExNtv']
            netFlows.push(todaysBtcInflow)
            console.log(`Btc in ${todaysBtcInflow}`)
        }
        else {
            console.log("File not found");
        }
    }
    xhr2.onload = function () {
        if (this.status === 200) {
            let obj = JSON.parse(this.responseText);
            let data = obj['data']
            let mostRecentSnippet = data[99]
            todaysBtcOutflow = mostRecentSnippet['FlowOutExNtv']
            netFlows.push(todaysBtcOutflow)
            console.log(`Btc out ${todaysBtcOutflow}`)
        }
        else {
            console.log("File not found");
        }
    }
    xhr3.onload = function () {
        if (this.status === 200) {
            let obj = JSON.parse(this.responseText);
            let data = obj['data']
            let mostRecentSnippet = data[99]
            todaysEthInflow = mostRecentSnippet['FlowInExNtv']
            netFlows.push(todaysEthInflow)
            console.log(`Eth in ${todaysEthInflow}`)
        }
        else {
            console.log("File not found");
        }
    }
    xhr4.onload = function () {
        if (this.status === 200) {
            let obj = JSON.parse(this.responseText);
            let data = obj['data']
            let mostRecentSnippet = data[99]
            todaysEthOutflow = mostRecentSnippet['FlowOutExNtv']
            netFlows.push(todaysEthOutflow)
            console.log(`Eth out ${todaysEthOutflow}`)
        }
        else {
            console.log("File not found");
        }
    }

    console.log(netFlows)
    netFlows.forEach(metric => {
        let div = document.createElement('li')
        div.className = "metric_row";
        let html = `
        <span class="token_list_text">${metric}</span>
        `
        div.innerHTML = html;
        list.appendChild(div)
    });

    xhr1.send();
    xhr2.send();
    xhr3.send();
    xhr4.send();
})
