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
    var todaysBtcInflow = new Array
    var todaysBtcOutflow = new Array
    var todaysEthInflow = new Array
    var todaysEthOutflow = new Array
    let netFlows = new Array
    xhr1.onload = function () {
        if (this.status === 200) {
            let obj = JSON.parse(this.responseText);
            let data = obj['data']
            let mostRecentSnippet = data[99]
            console.log(obj.data[99].FlowInExNtv)
            if (mostRecentSnippet) {
                todaysBtcInflow[0] = Number(mostRecentSnippet['FlowInExNtv']);
            } else {
                setTimeout(this, 300); // try again in 300 milliseconds
                console.log('trying again')
            }
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
            if (mostRecentSnippet) {
                todaysBtcOutflow[0] = Number(mostRecentSnippet['FlowOutExNtv']);
            } else {
                setTimeout(this, 300); // try again in 300 milliseconds
                console.log('trying again')
            }
            let btcNetFlow = todaysBtcInflow[0] - todaysBtcOutflow[0]
            if (btcNetFlow && todaysBtcOutflow[0] != NaN) {
                netFlows[0] = `BTC net flow: ${btcNetFlow}`;
                console.log(netFlows)
            } else {
                setTimeout(this, 300); // try again in 300 milliseconds
            }
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
            if (mostRecentSnippet) {
                todaysEthInflow[0] = Number(mostRecentSnippet['FlowInExNtv']);
            } else {
                setTimeout(this, 300); // try again in 300 milliseconds
                console.log('trying again')
            }
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
            if (mostRecentSnippet) {
                todaysEthOutflow[0] = Number(mostRecentSnippet['FlowOutExNtv']);
            } else {
                setTimeout(this, 300); // try again in 300 milliseconds
                console.log('trying again')
            }
            let ethNetFlow = todaysEthInflow[0] - todaysEthOutflow[0]
            if (ethNetFlow && todaysEthOutflow[0] != NaN) {
                netFlows[1] = `ETH net flow: ${ethNetFlow}`;
                console.log(netFlows)
            } else {
                setTimeout(this, 300); // try again in 300 milliseconds
            }
        }
        else {
            console.log("File not found");
        }
    }


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
