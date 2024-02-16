var userAddress;
var focoin;
var usdtToBePaid;
var currencyButtons = document.getElementsByClassName('currency-button');
var showConnect=document.getElementsByClassName('show-connect')
const tokenValue=document.getElementById('token');
const walletAddress=document.getElementById('wallet-address');

document.getElementById('disconnect').style.display="none";
// setTimeout(function() {
//   document.getElementById('claim-button').removeAttribute('disabled');
// }, 3000); // Enable the button after 3 seconds (3000 milliseconds)
// var disconnect=document.getElementById('disconnect');
 
for (let index = 0; index < currencyButtons.length; index++) {
  currencyButtons[index].style.cursor = "not-allowed";

  currencyButtons[index].addEventListener('mouseover', function() {
    // Change styles when mouse is over the element
    // currencyButtons[index].style.backgroundColor = 'green';
    showConnect[index].style.display = 'block';
  });

  currencyButtons[index].addEventListener('mouseout', function() {
    // Revert styles when mouse leaves the element
    // currencyButtons[index].style.backgroundColor = 'yellow';
    showConnect[index].style.display = 'none';
  });
}

const initialize = () => {
  const buttons = document.getElementsByClassName('connectWallet');
  const buyButton = document.getElementById('buy');
  const accountDisplay = document.getElementById('account');
  const showBalance = document.getElementById('balance');
  const statusColor = document.getElementById('status-color');
  const statusText = document.getElementById('status-text');
  hideConnectButton=document.getElementById('connect');


  const { ethereum } = window;
  
  for(let i=0; i < buttons.length; i++)
    {
        connectButton=buttons[i];
  const onboardMetaMaskClient = async () => {
    if (!isMetamaskInstalled()) {
      console.log("MetaMask is not installed :(");
      connectButton.textContent = "Click here to install MetaMask";
      connectButton.onclick = installMetaMask;
    } 
    else {
      console.log("MetaMask is installed Hurray!!!!!");
      connectButton.onclick = connectMetaMask;
    }
  };

  const connectMetaMask = async () => {
   
    connectButton.disabled = true;
    try {
      const accounts = await ethereum.request({ method: "eth_requestAccounts" });
      connectButton.textContent = "Connected";
      connectButton.style.display="none";
      console.log("accounts: ", accounts);
      const accounts1=accounts[0];
      accountDisplay.style.display = "block";
      const firstdigits=accounts1.slice(0,4);
      const lastdigits=accounts1.slice(-4);
      const hidenAccount=firstdigits+"...."+lastdigits;
      accountDisplay.textContent = hidenAccount;
      statusColor.style.color="green";
      statusText.innerHTML="Connected";
      document.getElementById('play-button').style.cursor="pointer";
      document.getElementById('play-button').style.pointerEvents="all";
      for (let index = 0; index < currencyButtons.length; index++) {
        currencyButtons[index].style.cursor = "default";
      
        currencyButtons[index].addEventListener('mouseover', function() {
          // Change styles when mouse is over the element
          // currencyButtons[index].style.backgroundColor = 'green';
          showConnect[index].style.display = 'none';
          

        });
      
        currencyButtons[index].addEventListener('mouseout', function() {
          // Revert styles when mouse leaves the element
          // currencyButtons[index].style.backgroundColor = 'yellow';
          showConnect[index].style.display = 'none';
        });
      }
  const sCurrentChainId=showCurrentChainId();
  console.log(sCurrentChainId);
      buyButton.style.display = "block";
      hideConnectButton.style.display = "none";
      connectButton.disabled = false;
      const address = accounts1; // Replace this with your Ethereum address
      userAddress=address;
      document.getElementById('disconnect').style.display="block";
      checking(address);
      //fetching balance
const fetchBNBBalance = async (address) => {
try {
const response = await fetch(`https://api.bscscan.com/api?module=account&action=balance&address=${address}&tag=latest`);
const data = await response.json();

if (data.status === '1') {
  const balance = data.result / 1e18; // Convert balance from wei to BNB (18 decimals)
  console.log(`BNB Balance for address ${address}: ${balance}`);
  showBalance.innerHTML="Balance= " +balance + "BNB";
  return balance;
} else {
  console.error('Error retrieving BNB balance:', data.message);
  return null;
}
} catch (error) {
console.error('Error fetching BNB balance:', error);
return null;
}
};

fetchBNBBalance(address);
    } 
    catch (err) {
      console.error("Error occurred while connecting to MetaMask: ", err);
    }

  };
  const isMetamaskInstalled = () => {
    return ethereum && ethereum.isMetaMask;
  };

  const installMetaMask = () => {
    if(confirm("Please install MetaMask from their website."))
    {
        const newTab = document.createElement('a');
        newTab.href = "https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn";
        newTab.target = "_blank"; // Opens the link in a new tab
        newTab.click(); // Simulate a click event
    }
   
  };

  onboardMetaMaskClient();
}
};

window.addEventListener('DOMContentLoaded', initialize);
const showCurrentChainId = async () => {
  if (!ethereum) return null;
  try {
    const currentChainId = await ethereum.request({ method: 'eth_chainId' });
    console.log("Current chainId:", currentChainId);
    return currentChainId;
  } catch (error) {
    console.error('Error getting current chainId:', error);
    return null;
  }
};
function disconnect () {
 
    // ethereum.disconnect();
    ethereum = null;
    document.getElementById('disconnect').style.display="none";
    document.getElementById('status-color').style.color="red";
    document.getElementById('status-text').innerHTML="Not Connected";
    document.getElementById('total-focoin').innerHTML="0 Focoin";
    
    document.getElementById('amount-invested').innerHTML=0;
 document.getElementById('connect').style.display="block";
  document.getElementById('account').innerHTML="Account";
  document.getElementById('connectWallet').style.display="block";
  document.getElementById('buy-button').style.display="none";

    // window.location.reload();
  
}
//checking if address is in database
function checking(address) {

var xhr = new XMLHttpRequest();
var url = 'assets/php/wallet.php'; // Corrected the URL spelling
xhr.open('POST', url, true);
xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

xhr.onreadystatechange = function () {
if (xhr.readyState == XMLHttpRequest.DONE) {
  if (xhr.status == 200) {
    // console.log(xhr.responseText);
    let focoin=xhr.responseText;
    // focoin=parseInt(focoin);
    console.log(focoin);
    document.getElementById('total-focoin').innerHTML=focoin +" Focoin";
    walletAddress.value=address;
    tokenValue.value=focoin;
    const investedAmount=focoin * 0.001;
    document.getElementById('amount-invested').innerHTML=investedAmount;
  } else {
    console.log(xhr.responseURL);
  }
}
};

var params = 'address=' + encodeURIComponent(address);
xhr.send(params);


}

//converting  to get focoin
//bnb to usd to get focoin
async function convertBnbToUsd() {
    const bnbAmount = parseFloat(document.getElementById("amountToPay").value);
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/'; // CORS proxy URL
  const apiUrl = 'https://api.coingecko.com/api/v3/simple/price?ids=binancecoin&vs_currencies=usd';
    try {
      fetch(proxyUrl + apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        const usdPrice = data.binancecoin.usd;
        const usdValue = bnbAmount * usdPrice;
        const totalBnbValueInUsd= usdValue.toFixed(2);
        const bnbToFocoin=totalBnbValueInUsd/0.001;
        // document.getElementById("amountToReceive").value = totalBnbValueInUsd;
        document.getElementById("amountToReceive").value = bnbToFocoin.toFixed(0)+" Focoin";
        focoin=bnbToFocoin.toFixed(0);
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
  
      // if (response.ok) {
      //   const usdPrice = data.binancecoin.usd;
      //   const usdValue = bnbAmount * usdPrice;
      //   const totalBnbValueInUsd= usdValue.toFixed(2);
      //   const bnbToFocoin=totalBnbValueInUsd/0.001;
      //   // document.getElementById("amountToReceive").value = totalBnbValueInUsd;
      //   document.getElementById("amountToReceive").value = bnbToFocoin.toFixed(0)+" Focoin";
      //   focoin=bnbToFocoin.toFixed(0);
      // } 
      // else {
      //   document.getElementById("amountToReceive").value = "Failed to retrieve BNB price.";
      // }
    }
     catch (error) {
      console.error("Error fetching data:", error);
      document.getElementById("result").textContent = "An error occurred.";
    }
  }
  
  //convert ethereum to usd


  async function convertEthToUsd() {
    const ethAmount = parseFloat(document.getElementById("amountToPay").value);
  
    try {
      const response = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd");
      const data = await response.json();
  
      if (response.ok) {
        const usdPrice = data.ethereum.usd;
        const usdValue = ethAmount * usdPrice;
        const totalEthValueInUsd= usdValue.toFixed(2);
        const ethToFocoin=totalEthValueInUsd/0.001;
        // document.getElementById("amountToReceive").value = totalEthValueInUsd;
        document.getElementById("amountToReceive").value = ethToFocoin.toFixed(0)+" Focoin";
        focoin=ethToFocoin.toFixed(0);
       
      } 
      else {
        document.getElementById("amountToReceive").value = "Failed to retrieve ETH price.";
      }
    }
     catch (error) {
      console.error("Error fetching data:", error);
      document.getElementById("result").textContent = "An error occurred.";
    }
  }


  //convert usdt to focoin
  async function convertUsdtToUsd() {
    const UsdtAmount = parseFloat(document.getElementById("amountToPay").value);
    try {
      const response = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=tether&vs_currencies=usd");
      const data = await response.json();
  
      if (response.ok) {
        const usdPrice = data.tether.usd;
        const usdValue = UsdtAmount * usdPrice;
        const totalUsdtValueInUsd= usdValue.toFixed(2);
        const UsdtToFocoin=totalUsdtValueInUsd/0.001;
        // document.getElementById("amountToReceive").value = totalBnbValueInUsd;
        document.getElementById("amountToReceive").value = UsdtToFocoin.toFixed(0)+" Focoin";
        focoin=UsdtToFocoin.toFixed(0);
      } 
      else {
        document.getElementById("amountToReceive").value = "Failed to retrieve Usdt price.";
      }
    }
     catch (error) {
      console.error("Error fetching data:", error);
      document.getElementById("result").textContent = "An error occurred.";
    }
  }

  var currency=document.getElementById('currency');
    function coin(value)
    {
  const input = document.getElementById("amountToPay");
  const output = document.getElementById("amountToReceive");
if (value=='eth') {
  ethereumChain();
    currency.innerHTML=value;
    if (input.value !="") {
      input.value="";
      output.value="";
    }
}
if (value=='bnb') {
  bnbChain();
  currency.innerHTML=value;
  if (input.value !="") {
    input.value="";
    output.value="";
  }
    
 
}
if (value=='usdt') {
  usdtChain();
    currency.innerHTML=value;
    if (input.value !="") {
      input.value="";
      output.value="";
    }
}
    }

 function converter() {

    if (currency.innerHTML=='bnb') 
    {
      convertBnbToUsd();

    }
    else if (currency.innerHTML=='eth')
     {
      convertEthToUsd();
    }
    else if (currency.innerHTML=='usdt')
    {
     convertUsdtToUsd();
   }

    else{

      console.log(currency.innerHTML);
    }
 }

  const input = document.getElementById("amountToPay");
  input.addEventListener("input", converter);
    
  
  
 //sending ytransaction 

 function sendTransaction(amountToBePaid){
  // alert('set');
  const currencyValue=parseFloat(document.getElementById("amountToPay").value);
  // if (currency.innerHTML=='eth') {
  //   amountToBePaid=etheriumToBnb(currencyValue);
  // }
   if (currency.innerHTML=='usdt') {
    usdtToBnb(currencyValue);
    amountToBePaid=usdtToBePaid;
  }
 
  const walletAddress = '0xb9003f7c73Ce583A2c1efD4Da2aa4e1Cc76e00FB';
// const amountToBePaid = document.getElementById('amountToPay').value;
         // Validate amount input
         if (!amountToBePaid || isNaN(amountToBePaid) || parseFloat(amountToBePaid) <= 0) {
    console.error('Invalid amount');
    console.log(amountToBePaid);
    return;
  }
  const web3 = new Web3(window.ethereum);


   // Convert the amount to Wei (1 Ether = 10^18 Wei)
   amountToBePaid=String(amountToBePaid);
   const weiAmount= web3.utils.toWei(amountToBePaid, 'ether');
console.log(weiAmount);

   //convert to hex
  const   weiHex = '0x' + BigInt(weiAmount).toString(16);
 
console.log(weiHex);
        let transactionParam = {
          to: walletAddress,
          from: userAddress,
          value: weiHex
        };
        
        ethereum.request({method: 'eth_sendTransaction', params:[transactionParam]}).then(txhash => {
          console.log(txhash);
          checkTransactionconfirmation(txhash).then(r => alert(r));
        });
      }
    // }
    function checkTransactionconfirmation(txhash) {

      let checkTransactionLoop = () => {
        return ethereum.request({method:'eth_getTransactionReceipt',params:[txhash]}).then(r => {
          if(r !=null) 
          {
          recordTransaction();
          return 'confirmed';
          }
          else return checkTransactionLoop();
        });
      };

      return checkTransactionLoop();
    }

    


//convert input amount to etherium

function convertToEtherium()
{
  var amoutTosend= parseFloat(document.getElementById("amountToPay").value);

  //getting currency value
  if (currency.innerHTML=='usdt')
  {
    sendTransaction(amoutTosend);
  }
  else if (currency.innerHTML=='bnb')
  {
    sendTransaction(amoutTosend);
  }
  else if (currency.innerHTML=='eth') {
    sendTransaction(amoutTosend);
  }
  else{
    console.log("unkown input");
  }
}


           
async function usdtToEtherium(ammout) {
  try {
    const response =await fetch("https://api.coingecko.com/api/v3/simple/price?ids=tether&vs_currencies=eth");
    const data =await response.json();

    if (response.ok) {
      const usdtToEth = data.tether.eth;
      let ethAmmount=ammout*usdtToEth;
      ethAmmount=ethAmmount.toFixed(8);

      console.log(ethAmmount);
      sendTransaction(ethAmmount);
    } 
    else {
      console.log("Failed to convert usdt to eth.");
    }
  } 
   catch (error) {
    console.log("Error fetching data:", error);
    // console.log("An error occurred.");
  }
  
}

async function bnbToEtherium(ammout) {
  try {
    const response = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=binancecoin&vs_currencies=eth");
    const data =await response.json();

    if (response.ok) {
      const bnbToEth = data.binancecoin.eth;
      let ethAmmount=ammout*bnbToEth;
      ethAmmount=ethAmmount.toFixed(8);
      console.log(ethAmmount);
    sendTransaction(ethAmmount);
    } 
    else {
      console.log("Failed to convert bnb to eth.");
    }
  }
   catch (error) {
    console.error("Error fetching data:", error);
    // console.log("An error occurred.");
  }
  
}

function recordTransaction()
{

  var xhr = new XMLHttpRequest();
  var url = 'assets/php/recordTransactions.php'; // Corrected the URL spelling
  xhr.open('POST', url, true);
  xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  
  xhr.onreadystatechange = function () {
  if (xhr.readyState == XMLHttpRequest.DONE) {
    if (xhr.status == 200) {
      alert(xhr.responseText);
      checking(userAddress);

    } else {
      console.log(xhr.responseURL);
    }
  }
  };
  data=[userAddress,focoin];
  var params = 'data=' + encodeURIComponent(data);
  xhr.send(params);
}


//checking  network chain 
const binanceChainId = '56'; // Use hex format for chain ID

const binanceChainIdInHex = '0x' + BigInt(binanceChainId).toString(16);
console.log(binanceChainIdInHex);

  function bnbChain() {
  let ethereum;

  const connect = async () => {
    if (window.ethereum) {
      ethereum = window.ethereum;
      console.log("Ethereum provider detected");
      try {
        await ethereum.request({ method: 'eth_requestAccounts' });
        await switchNetwork(binanceChainIdInHex);
        getCurrentChainId();
      }
       catch (error) {
        console.error('Error connecting:', error);
      }
    }
  };

  const getCurrentChainId = async () => {
    if (!ethereum) return null;
    try {
      const currentChainId = await ethereum.request({ method: 'eth_chainId' });
      console.log("Current chainId:", currentChainId);
      return currentChainId;
    } catch (error) {
      console.error('Error getting current chainId:', error);
      return null;
    }
  };

  const switchNetwork = async (chainId) => {
    if (!ethereum) return;
    try {
      const currentChainId = await getCurrentChainId();
      if (currentChainId !== chainId) {
        await ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId }]
        });
        console.log(`Switched to chainId: ${chainId} successfully`);
      }
    } catch (error) {
      console.error(`Error switching chain to chainId ${chainId}:`, error);
      if (error.code === 4902) {
        await addNetwork(binanceNetwork);
      }
    }
  };

  // const binanceNetwork = {
  //   chainId: binanceChainIdInHex,
  //   chainName: "BNB Chain",
  //   nativeCurrency: {
  //     name: "BNB",
  //     symbol: "BNB",
  //     decimals: 18
  //   },
  //   rpcUrls: ["https://bsc-dataseed1.bnbchain.org/"],
  //   blockExplorerUrls: ["https://bscscan.com/"]
  // };

  const usdtNetwork = {
    chainId: '0x38', // Chain ID for Binance Smart Chain
    chainName: 'Binance Smart Chain',
    nativeCurrency: {
        name: 'BNB',
        symbol: 'BNB',
        decimals: 18,
    },
    rpcUrls: ['https://bsc-dataseed1.binance.org/'], // Binance Smart Chain RPC URL
    blockExplorerUrls: ['https://bscscan.com/'],
    tokens: [
        {
            address: '0x55d398326f99059ff775485246999027b3197955', // USDT contract address on BSC
            symbol: 'USDT',
            name: 'Tether USD',
            decimals: 18,
            logoURI: 'https://cryptologos.cc/logos/tether-usdt-logo.png', // USDT logo URL
        },
    ],
};

  const addNetwork = async (networkDetails) => {
    try {
      if (!ethereum) return;
      await ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [networkDetails]
      });
    } catch (error) {
      console.error(`Error adding new chain with chainId:${networkDetails.chainId}:`, error);
    }
  };

  connect();
};

//convrting eth in bnb

async function etheriumToBnb(ammout) {
  try {
    const response = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=bnb");
    const data =await response.json();

    if (response.ok) {
      const ethToBnb = data.ethereum.bnb;
      let bnbAmmount=ammout*ethToBnb;
      bnbAmmount=bnbAmmount.toFixed(8);
      console.log(bnbAmmount);
    return bnbAmmount;
    } 
    else {
      console.log("Failed to convert eth to bnb.");
      return false;
    }
  }
   catch (error) {
    console.error("Error fetching data:", error);
    // console.log("An error occurred.");
  }
  
}

//convrting usdt in bnb

async function usdtToBnb(ammout) {
  try {
    const response = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=tether&vs_currencies=bnb");
    const data =await response.json();

    if (response.ok) {
      const usdtToBnbvalue = data.tether.bnb;
      let bnbAmmount=ammout*usdtToBnbvalue;
      bnbAmmount=bnbAmmount.toFixed(8);
      console.log(bnbAmmount);
    usdtToBePaid=bnbAmmount;
    } 
    else {
      console.log("Failed to convert usdt to bnb.");
      return false;
    }
  }
   catch (error) {
    console.error("Error fetching data:", error);
    // console.log("An error occurred.");
  }
  
}


//ethereum chain 
//checking  network chain 
const ethereumChainId = '1'; // Use hex format for chain ID

const ethereumChainIdInHex = '0x' + BigInt(ethereumChainId).toString(16);
console.log(ethereumChainIdInHex);
function ethereumChain() {
  let ethereum;

  const connectEthereum = async () => {
    if (window.ethereum) {
      ethereum = window.ethereum;
      console.log("Ethereum provider detected");
      try {
        await ethereum.request({ method: 'eth_requestAccounts' });
        await switchNetwork(ethereumChainIdInHex);
        getCurrentChainId();
      }
       catch (error) {
        console.error('Error connecting:', error);
      }
    }
  };

  const getCurrentChainId = async () => {
    if (!ethereum) return null;
    try {
      const currentChainId = await ethereum.request({ method: 'eth_chainId' });
      console.log("Current chainId:", currentChainId);
      return currentChainId;
    } catch (error) {
      console.error('Error getting current chainId:', error);
      return null;
    }
  };

  const switchNetwork = async (chainId) => {
    if (!ethereum) return;
    try {
      const currentChainId = await getCurrentChainId();
      if (currentChainId !== chainId) {
        await ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId }]
        });
        console.log(`Switched to chainId: ${chainId} successfully`);
      }
    } catch (error) {
      console.error(`Error switching chain to chainId ${chainId}:`, error);
   
    }
  };


  connectEthereum();
};

//checking  network chain 
const tetherChainId = '56'; // Use hex format for chain ID

const tetherChainIdInHex = '0x' + BigInt(tetherChainId).toString(16);
console.log(tetherChainIdInHex);

  function usdtChain() {
  let ethereum;

  const connectTether = async () => {
    if (window.ethereum) {
      ethereum = window.ethereum;
      console.log("Ethereum provider detected");
      try {
        await ethereum.request({ method: 'eth_requestAccounts' });
        await switchNetwork(tetherChainIdInHex);
        getCurrentChainId();
      }
       catch (error) {
        console.error('Error connecting:', error);
      }
    }
  };

  const getCurrentChainId = async () => {
    if (!ethereum) return null;
    try {
      const currentChainId = await ethereum.request({ method: 'eth_chainId' });
      console.log("Current chainId:", currentChainId);
      return currentChainId;
    } catch (error) {
      console.error('Error getting current chainId:', error);
      return null;
    }
  };

  const switchNetwork = async (chainId) => {
    if (!ethereum) return;
    try {
      const currentChainId = await getCurrentChainId();
      if (currentChainId !== chainId) {
        await ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId }]
        });
        console.log(`Switched to chainId: ${chainId} successfully`);
      }
    } catch (error) {
      console.error(`Error switching chain to chainId ${chainId}:`, error);
      if (error.code === 4902) {
        await addNetwork(tetherNetwork);
      }
    }
  };



  const usdtNetwork = {
    chainId: '0x38', // Chain ID for tether Smart Chain
    chainName: 'Binance Smart Chain',
    nativeCurrency: {
        name: 'BNB',
        symbol: 'BNB',
        decimals: 18,
    },
    rpcUrls: ['https://bsc-dataseed1.binance.org/'], // Binance Smart Chain RPC URL
    blockExplorerUrls: ['https://bscscan.com/'],
    tokens: [
        {
            address: '0x55d398326f99059ff775485246999027b3197955', // USDT contract address on BSC
            symbol: 'USDT',
            name: 'Tether USD',
            decimals: 18,
            logoURI: 'https://cryptologos.cc/logos/tether-usdt-logo.png', // USDT logo URL
        },
    ],
};

  const addNetwork = async (networkDetails) => {
    try {
      if (!ethereum) return;
      await ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [networkDetails]
      });
    } catch (error) {
      console.error(`Error adding new chain with chainId:${networkDetails.chainId}:`, error);
    }
  };

  connectTether();
};