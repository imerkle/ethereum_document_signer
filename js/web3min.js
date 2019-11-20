import './web3min12.js';

//Using the web3 provider that comes with metamask
var provider;

if (window.ethereum)
{
    //console.log("provider","new");
    provider = window.ethereum;
}
else if(window.web3)
{
    //console.log("provider","old");
    provider = window.web3.currentprovider;
}
else
{
    provider = null;
}

if (provider!=null)
{
    //console.log("provider","added");
    //Web3 with uppercase is the constructor, to create a new instanse of web3
    web3 = new Web3(provider); //The copy of web3 that is coming from metamask library
}
else
{
    web3 = null;
}

export default web3;
