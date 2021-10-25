const list = document.getElementById('metric_list') // where metrics will be appended

// flow in/out of exchanges ex. coinbase, binance, etc. for bitcoin and ethereum
async function btcFlow() {
    try {
        const btcInUrl = `https://community-api.coinmetrics.io/v4/timeseries/asset-metrics?assets=btc&metrics=FlowInExNtv`
        const btcOutUrl = `https://community-api.coinmetrics.io/v4/timeseries/asset-metrics?assets=btc&metrics=FlowOutExNtv`

        const results = await Promise.all([
            fetch(btcInUrl),
            fetch(btcOutUrl)
        ])
        const data = await Promise.all(results.map(result => result.json()))
        const finalData = data[0].data[99].FlowInExNtv - data[1].data[99].FlowOutExNtv // data[0] is inflow, [1] is outflow

        // subtract outflow from inflow then append result to metric list

        let div = document.createElement('li')
        div.className = "metric_row";
        let html = `
            <span class='token_list_text'> BTC exchange netflow: ${finalData}</span>
            `
        div.innerHTML = html;
        list.appendChild(div)
    }
    catch (err) {
        console.error('error')
    }
}

async function ethFlow() {
    try {
        const ethInUrl = `https://community-api.coinmetrics.io/v4/timeseries/asset-metrics?assets=eth&metrics=FlowInExNtv`
        const ethOutUrl = `https://community-api.coinmetrics.io/v4/timeseries/asset-metrics?assets=eth&metrics=FlowOutExNtv`

        const results = await Promise.all([
            fetch(ethInUrl),
            fetch(ethOutUrl)
        ])
        const data = await Promise.all(results.map(result => result.json()))
        const finalData = data[0].data[99].FlowInExNtv - data[1].data[99].FlowOutExNtv // data[0] is inflow, [1] is outflow

        // subtract outflow from inflow then append result to metric list

        let div = document.createElement('li')
        div.className = "metric_row";
        let html = `
            <span class='token_list_text'> ETH exchange netflow: ${finalData}</span>
            `
        div.innerHTML = html;
        list.appendChild(div)

    }
    catch (err) {
        console.error('error')
    }
}

// Mining hash rates for btc and eth
async function btcHashRateMonthOverMonth() {
    try {
        const btcHashRateUrl = `https://community-api.coinmetrics.io/v4/timeseries/asset-metrics?assets=btc&metrics=HashRate`

        const result = await fetch(btcHashRateUrl)
        const btcData = await result.json()
        const monthOverMonthHashRate = btcData.data[99].HashRate - btcData.data[69].HashRate // data[99] is today's hash rate, [69] is 30 days ago

        // subtract hash rate of 30 days ago from today's then htmlify

        let div = document.createElement('li')
        div.className = "metric_row";
        let html = `
            <span class='token_list_text'> BTC hash rate MoM: ${monthOverMonthHashRate} TH</span>
            `
        div.innerHTML = html;
        list.appendChild(div)

    }
    catch (err) {
        console.error('error')
    }
}

async function ethHashRateMonthOverMonth() {
    try {
        const ethHashRateUrl = `https://community-api.coinmetrics.io/v4/timeseries/asset-metrics?assets=eth&metrics=HashRate`

        const result = await fetch(ethHashRateUrl)
        const ethData = await result.json()
        const monthOverMonthHashRate = ethData.data[99].HashRate - ethData.data[69].HashRate // data[99] is today's hash rate, [69] is 30 days ago

        // subtract hash rate of 30 days ago from today's then htmlify

        let div = document.createElement('li')
        div.className = "metric_row";
        let html = `
            <span class='token_list_text'> ETH hash rate MoM: ${monthOverMonthHashRate} TH</span>
            `
        div.innerHTML = html;
        list.appendChild(div)

    }
    catch (err) {
        console.error('error')
    }
}

btcHashRateMonthOverMonth()
ethHashRateMonthOverMonth()
btcFlow()
ethFlow()