// decentralized exchange through 1inch Moralis plugin
import { APPLICATION_ID, SERVER_URL } from "./Constants";

let currentTrade = {};
let currentSelectSide;
let tokens;

Moralis.start({ SERVER_URL, APPLICATION_ID });

async function init() {
  await Moralis.initPlugins();
  await Moralis.enable();
  await listAvailableTokens();
  currentUser = Moralis.User.current();
  if (currentUser) {
    $("#swap_button").prop("disabled", false);
  }
}

async function listAvailableTokens() {
  const result = await Moralis.Plugins.oneInch.getSupportedTokens({
    chain: "eth", // The blockchain you want to use (eth/bsc/polygon)
  });
  tokens = result.tokens;
  let parent = document.getElementById("token_list");
  for (const address in tokens) {
    let token = tokens[address];
    let div = document.createElement("li");
    div.setAttribute("data-address", address);
    div.className = "token_row";
    let html = `
        <img class="token_list_img" src="${token.logoURI}">
        <span class="token_list_text">${token.symbol}</span>
        `;
    div.innerHTML = html;
    div.onclick = () => {
      selectToken(address);
    };
    parent.appendChild(div);
  }
  currentTrade.from = tokens["0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"];
  document.getElementById("from_token_img").src = currentTrade.from.logoURI;
  document.getElementById("from_token_text").innerHTML =
    currentTrade.from.symbol;
}

function selectToken(address) {
  closeModal();
  currentTrade[currentSelectSide] = tokens[address];
  renderInterface();
  getQuote();
}

function renderInterface() {
  if (currentTrade.from) {
    document.getElementById("from_token_img").src = currentTrade.from.logoURI;
    document.getElementById("from_token_text").innerHTML =
      currentTrade.from.symbol;
  }
  if (currentTrade.to) {
    document.getElementById("to_token_img").src = currentTrade.to.logoURI;
    document.getElementById("to_token_text").innerHTML = currentTrade.to.symbol;
  }
}

async function login() {
  try {
    currentUser = Moralis.User.current();
    if (!currentUser) {
      currentUser = await Moralis.Web3.authenticate();
    }
    $("#swap_button").prop("disabled", false);
    $("#login_button")
      .html(`<img id="ethLogo" src=https://tokens.1inch.io/0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee.png />
                    <span id="chainName">Connected</span>`);
  } catch (error) {
    console.log(error);
  }
}

function openModal(side) {
  currentSelectSide = side;
  document.getElementById("token_modal").style.display = "block";
}
function closeModal() {
  document.getElementById("token_modal").style.display = "none";
}

async function getQuote() {
  if (!currentTrade.from || !currentTrade.to) return;
  else if (
    document.getElementById("from_amount").value &&
    !document.getElementById("to_amount").value
  ) {
    console.log(true);
    let amount = Number(
      document.getElementById("from_amount").value *
        10 ** currentTrade.from.decimals
    );

    const quote = await Moralis.Plugins.oneInch.quote({
      chain: "eth", // The blockchain you want to use (eth/bsc/polygon)
      fromTokenAddress: currentTrade.from.address, // The token you want to swap
      toTokenAddress: currentTrade.to.address, // The token you want to receive
      amount: amount,
    });
    document.getElementById("gas_estimate").innerHTML = quote.estimatedGas;
    document.getElementById("to_amount").value =
      quote.toTokenAmount / 10 ** quote.toToken.decimals;
  } else if (
    document.getElementById("to_amount").value &&
    !document.getElementById("from_amount").value
  ) {
    console.log(true);
    let amount = Number(
      document.getElementById("to_amount").value *
        10 ** currentTrade.to.decimals
    );

    const quote = await Moralis.Plugins.oneInch.quote({
      chain: "eth", // The blockchain you want to use (eth/bsc/polygon)
      fromTokenAddress: currentTrade.to.address, // The token you want to swap
      toTokenAddress: currentTrade.from.address, // The token you want to receive
      amount: amount,
    });
    document.getElementById("gas_estimate").innerHTML = quote.estimatedGas;
    document.getElementById("from_amount").value =
      quote.toTokenAmount / 10 ** quote.toToken.decimals;
  }
}
function searchBar() {
  document.addEventListener("DOMContentLoaded", function () {
    const list = document.querySelector("#token_list");
    const forms = document.forms;

    // filter tokens
    const searchBar = forms["search-tokens"].querySelector("input"); // line 63 index.html
    searchBar.addEventListener("keyup", (e) => {
      const term = e.target.value.toUpperCase();
      const tokens = list.getElementsByTagName("li");
      const arr = Array.from(tokens);
      arr.forEach((token) => {
        const title = token.lastElementChild.textContent; // token's name
        let tmp;
        if (title === term) {
          tmp = token.nextElementSibling; // store sibling after exact match token to insert token before if not exact match anymore
          list.insertBefore(token, list.firstElementChild); // exact match listed before arr[0] appears at top of list
        } else if (title.toUpperCase().indexOf(term) != -1) {
          list.insertBefore(token, tmp);
          token.style.display = "";
        } else {
          token.style.display = "none";
        }
      });
    });
  });
}
searchBar();

async function trySwap() {
  let address = Moralis.User.current().get("ethAddress");
  let amount = Number(
    document.getElementById("from_amount").value *
      10 ** currentTrade.from.decimals
  );
  if (currentTrade.from.symbol !== "ETH") {
    const allowance = await Moralis.Plugins.oneInch.hasAllowance({
      chain: "eth", // The blockchain you want to use (eth/bsc/polygon)
      fromTokenAddress: currentTrade.from.address, // The token you want to swap
      fromAddress: address, // Your wallet address
      amount: amount,
    });
    console.log(allowance);
    if (!allowance) {
      await Moralis.Plugins.oneInch.approve({
        chain: "eth", // The blockchain you want to use (eth/bsc/polygon)
        tokenAddress: currentTrade.from.address, // The token you want to swap
        fromAddress: address, // Your wallet address
      });
    }
  }
  try {
    let receipt = await doSwap(address, amount);
    console.log(receipt);
    alert("Swap Complete");
  } catch (error) {
    console.log(error);
  }
}

function doSwap(userAddress, amount) {
  return Moralis.Plugins.oneInch.swap({
    chain: "eth", // The blockchain you want to use (eth/bsc/polygon)
    fromTokenAddress: currentTrade.from.address, // The token you want to swap
    toTokenAddress: currentTrade.to.address, // The token you want to receive
    amount: amount,
    fromAddress: userAddress, // Your wallet address
    slippage: 1,
  });
}

init();

$("#modal_close").click(closeModal);
$(".modal-content").mouseleave(closeModal);
$("#from_token_select").click(() => {
  openModal("from");
});
$("#to_token_select").click(() => {
  openModal("to");
});
$("#from_amount").blur(getQuote);
$("#to_amount").blur(getQuote);
$("#swap_button").click(trySwap);
$("#login_button").click(login);
