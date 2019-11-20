async function estgas(value)
{
  try
  {

    await contractinstance.methods.registerHash(value).estimateGas({
      value: web3.utils.toWei(registerhashamount.toString(), "ether")
    })
      .then(function (gasAmount)
      {
        gasamt = gasAmount * 2;
      })
      .catch(function (error)
      {
        //alert(error);
        gasamt = 0;
      });
  } catch (error)
  {
    //alert(error);
    gasamt = 0;
  }
} //end of estimate gas

async function estgaschangeownership(hsh, newown)
{
  try
  {
    //alert(hsh);
    //alert(newown);
    await contractinstance.methods.changeHashOwnership(hsh, newown).estimateGas({
      from: web3.eth.defaultAccount,
      value: web3.utils.toWei(changehashowneramount.toString(), "ether")
    })
      .then(function (gasAmount)
      {
        //alert(gasAmount);
        gasamt = gasAmount * 2;
      })
      .catch(function (error)
      {
        //alert("Catch Error: " + printobject(error));
        gasamt = 0;
      });
  } catch (error)
  {
    //alert("Catch2 Error: " + printobject(error));
    gasamt = 0;
  }
} //end of estgaschangeownership

async function getHashOwnersCount()
{
  hashownerscount = 0;
  try
  {
    if (checkweb3())
    {
      let sv = verifyHash("hashtoregister");
      if (sv.length > 0)
      {
        await contractinstance.methods.getHashOwnersCount(sv).call()
          .then(function (value)
          {
            hashownerscount = value;
          });
      }
    }
  } catch (error)
  {
    //alert("gethashownercount error:" + error.toString);
    hashownerscount = 0;
  }
} //getHashOwnersCount()

async function getCurrentHashOwner()
{
  let sv = verifyHash("hashtoregister");
  hashownerscount = 0;
  await getHashOwnersCount();

  if (hashownerscount > 0)
  {
    let cn = hashownerscount - 1;
    await contractinstance.methods.getHashDetails(sv, cn).call()
      .then(function (value)
      {
        currenthashowner = returncurrentowner(value);
      });
  }

}//end of getCurrentHashOwner()

function verifyHash(elementid)
{
  let sv = document.getElementById(elementid).value;

  if (Number(sv.length) >= 64)
  {
    if (!sv.startsWith('0x'))
    {
        sv = '0x'.concat(sv);
    }
   
    if (web3.utils.isHexStrict(sv))
    {
      return sv;
    }
    else
    {
      return "";
    }
  }
  else
  {
    return "";
  }
}//end of verfiy hash

function converttimestamptodate(tmstamp)
{
  var dt = new Date(tmstamp * 1000);
  return dt.toUTCString();
  //console.log(dt.toUTCString());
} //end of converttimestamptodate

/*****
 async function getallhashes()
    {
      try
      {
     await setDefaultAccount();   
     await contractinstance.getPastEvents('RegisterHashEvent', 
      {
        filter: { msgsender: web3.eth.defaultAccount}, // Using an array means OR: e.g. 20 or 23
        fromBlock: 0,
        toBlock: 'latest'
      })
        .then(function (events)
        {
          document.getElementById("displayresult").style.visibility = "visible";
          document.getElementById("displayresult").innerHTML = printpasteventresult(events);
        });
    }
    catch(error)
    {
      alert("catch2: " +error.toString());
    }
  }

  *****/

 /*********

  function printpasteventresult(result)
  {
    
      //This function will print key value pairs for the result object
    
   let resultstr = "";
   if (result !== null && Object.getOwnPropertyNames(result).length > 0)
   {
     for (ky in result) 
     {
       if (result.hasOwnProperty(ky)) 
       {
         
         resultstr += ky + ": " + result[ky]["returnValues"]["hash"];
        
       }
       resultstr += "<br>";
     }
     return resultstr;
   }
   else
   {
     return "No entries";
   }

 }//end of printkeyvaluepairs()
******/

   


 