const list = document.getElementById('metric_list') // where metrics will be appended

// flow in/out of exchanges ex. coinbase, binance, etc. for btc/eth 
async function btcInFlow() {
    try {
        const data = await fetch(`https://community-api.coinmetrics.io/v4/timeseries/asset-metrics?assets=btc&metrics=FlowInExNtv`).then(response => {
            return response.json();
        }).then(btc => {
            return btc.data[99].FlowInExNtv
        })
        return data
    }
    catch (err) {
        console.log('error')
    }
}

async function btcOutFlow() {
    try {
        const data = fetch(`https://community-api.coinmetrics.io/v4/timeseries/asset-metrics?assets=btc&metrics=FlowOutExNtv`).then(response => {
            return response.json();
        }).then(btc => {
            return btc.data[99].FlowOutExNtv
        })
        return data
    }
    catch (err) {
        console.log('error')
    }
}

async function ethInFlow() {
    try {
        const data = await fetch(`https://community-api.coinmetrics.io/v4/timeseries/asset-metrics?assets=eth&metrics=FlowInExNtv`).then(response => {
            return response.json();
        }).then(btc => {
            return btc.data[99].FlowInExNtv
        })
        return data
    }
    catch (err) {
        console.log('error')
    }
}

async function ethOutFlow() {
    try {
        const data = fetch(`https://community-api.coinmetrics.io/v4/timeseries/asset-metrics?assets=eth&metrics=FlowOutExNtv`).then(response => {
            return response.json();
        }).then(btc => {
            return btc.data[99].FlowOutExNtv
        })
        return data
    }
    catch (err) {
        console.log('error')
    }
}

// subtract outflow from inflow then append result to metric list
async function btcNetFlow() {
    try {
        btcInFlow().then(x => {
            return btcOutFlow().then(y => {
                return x - y
            }).then(data => {
                let div = document.createElement('li')
                div.className = "metric_row";
                let html = `
                <span class='token_list_text'> BTC exchange netflow: ${data}</span>
                `
                div.innerHTML = html;
                list.appendChild(div)
            })
        })
    }
    catch (err) {
        console.log('nope')
    }
}

async function ethNetFlow() {
    try {
        ethInFlow().then(x => {
            return ethOutFlow().then(y => {
                return x - y
            }).then(data => {
                let div = document.createElement('li')
                div.className = "metric_row";
                let html = `
                <span class="token_list_text">ETH exchange netflow: ${data}</span>
                `
                div.innerHTML = html;
                list.appendChild(div)
            })
        })
    }
    catch (err) {
        console.log('nope')
    }
}

// Mining hash rates for btc and eth
async function btcHashRateToday() {
    try {
        const data = await fetch(`https://community-api.coinmetrics.io/v4/timeseries/asset-metrics?assets=btc&metrics=HashRate`).then(response => {
            return response.json();
        }).then(btc => {
            return btc.data[99].HashRate
        })
        return data
    }
    catch (err) {
        console.log('error')
    }
}

async function btcHashRateLastMonth() {
    try {
        const data = await fetch(`https://community-api.coinmetrics.io/v4/timeseries/asset-metrics?assets=btc&metrics=HashRate`).then(response => {
            return response.json();
        }).then(btc => {
            console.log(btc)
            return btc.data[69].HashRate
        })
        return data
    }
    catch (err) {
        console.log('error')
    }
}

// subtract hash rate of 30 days ago from todays then append to metric list
async function btcHashRateMonthOverMonth() {
    try {
        btcHashRateToday().then(x => {
            return btcHashRateLastMonth().then(y => {
                return x - y
            }).then(data => {
                let div = document.createElement('li')
                div.className = "metric_row";
                let html = `
                <span class="token_list_text">BTC hash rate MoM: ${data}</span>
                `
                div.innerHTML = html;
                list.appendChild(div)
            })
        })
    }
    catch (err) {
        console.log('nope')
    }
}

async function ethHashRateToday() {
    try {
        const data = await fetch(`https://community-api.coinmetrics.io/v4/timeseries/asset-metrics?assets=eth&metrics=HashRate`).then(response => {
            return response.json();
        }).then(eth => {
            return eth.data[99].HashRate
        })
        return data
    }
    catch (err) {
        console.log('error')
    }
}

async function ethHashRateLastMonth() {
    try {
        const data = await fetch(`https://community-api.coinmetrics.io/v4/timeseries/asset-metrics?assets=eth&metrics=HashRate`).then(response => {
            return response.json();
        }).then(eth => {
            console.log(eth)
            return eth.data[69].HashRate
        })
        return data
    }
    catch (err) {
        console.log('error')
    }
}

async function ethHashRateMonthOverMonth() {
    try {
        ethHashRateToday().then(x => {
            return ethHashRateLastMonth().then(y => {
                return x - y
            }).then(data => {
                let div = document.createElement('li')
                div.className = "metric_row";
                let html = `
                <span class="token_list_text">ETH hash rate MoM: ${data}</span>
                `
                div.innerHTML = html;
                list.appendChild(div)
            })
        })
    }
    catch (err) {
        console.log('nope')
    }
}

btcNetFlow()
ethNetFlow()
btcHashRateMonthOverMonth()
ethHashRateMonthOverMonth()