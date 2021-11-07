// get token metrics from API calls

// flow in/out of exchanges ex. coinbase, binance, etc. for bitcoin and ethereum, subtract to get net flow
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
        const htmlFriendly = `BTC net flow: ${finalData}`
        return htmlFriendly
    }
    catch (err) {
        const htmlFriendlyError = "Sorry, there was an error getting BTC net flow"
        return htmlFriendlyError
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
        const htmlFriendly = `ETH net flow: ${finalData}`
        return htmlFriendly
    }
    catch (err) {
        const htmlFriendlyError = "Sorry, there was an error getting ETH net flow"
        return htmlFriendlyError
    }
}

// Mining hash rates for btc and eth, subtract to get month over month growth of rates
async function btcHashRateMonthOverMonth() {
    try {
        const btcHashRateUrl = `https://community-api.coinmetrics.io/v4/timeseries/asset-metrics?assets=btc&metrics=HashRate`

        const result = await fetch(btcHashRateUrl)
        const btcData = await result.json()
        const monthOverMonthHashRate = btcData.data[99].HashRate - btcData.data[69].HashRate // data[99] is today's hash rate, [69] is 30 days ago
        const htmlFriendly = `BTC hash rate MoM: ${monthOverMonthHashRate}`
        return htmlFriendly
    }
    catch (err) {
        const htmlFriendlyError = "Sorry, there was an error getting BTC hash rate"
        return htmlFriendlyError
    }
}

async function ethHashRateMonthOverMonth() {
    try {
        const ethHashRateUrl = `https://community-api.coinmetrics.io/v4/timeseries/asset-metrics?assets=eth&metrics=HashRate`

        const result = await fetch(ethHashRateUrl)
        const ethData = await result.json()
        const monthOverMonthHashRate = ethData.data[99].HashRate - ethData.data[69].HashRate // data[99] is today's hash rate, [69] is 30 days ago
        const htmlFriendly = `ETH hash rate MoM: ${monthOverMonthHashRate}`
        return htmlFriendly
    }
    catch (err) {
        const htmlFriendlyError = "Sorry, there was an error getting ETH hash rate"
        return htmlFriendlyError
    }
}

// await each previous metric grabbing function then parse into html
async function htmlify() {
    const results = await Promise.all([
        btcFlow(),
        ethFlow(),
        btcHashRateMonthOverMonth(),
        ethHashRateMonthOverMonth()
    ])
    const data = await Promise.all(results)
    data.forEach(metric => {
        $('#metric_list').append(`<li><span class='metric_list_text'>${metric}</span></li>`); // create LIs filled with spans of metrics then append to metric list
    })
}

htmlify()