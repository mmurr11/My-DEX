async function btcInFlow() {
    fetch(`https://community-api.coinmetrics.io/v4/timeseries/asset-metrics?assets=btc&metrics=FlowInExNtv`).then(response => {
        return response.json();
    }).then(btc => {
        return btc.data[99].FlowInExNtv
    })
}
let btcOutFlow = fetch(`https://community-api.coinmetrics.io/v4/timeseries/asset-metrics?assets=btc&metrics=FlowOutExNtv`).then(response => {
    return response.json();
}).then(btc => {
    return btc.data[99].FlowOutExNtv
}).then(data => {
    console.log(data)
})

// async function main() {
//     return await btcInFlow();
// }

let pls = btcInFlow().catch()

btcInFlow().catch(console.log);
console.log(pls)