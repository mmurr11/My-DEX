const list = document.getElementById('metric_list')

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

btcNetFlow()
ethNetFlow()