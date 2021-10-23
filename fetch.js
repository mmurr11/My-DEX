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

async function btcNetFlow() {
    try {
        btcInFlow().then(x => {
            return btcOutFlow().then(y => {
                return x - y
            }).then(data => {
                console.log(data)
            })
        })
    }
    catch (err) {
        console.log('nope')
    }
}

btcNetFlow()