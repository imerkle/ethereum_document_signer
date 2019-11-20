/*
Calculates the hash of the selected File.
*/

const fileSelect = document.getElementById("fileSelect"),
  fileElem = document.getElementById("fileElem");

async function digestMessage(message) 
{
  //const msgUint8 = new TextEncoder().encode(message);                           // encode as (utf-8) Uint8Array
  const hashBuffer = await crypto.subtle.digest('SHA-256', message);           // hash the message
  const hashArray = Array.from(new Uint8Array(hashBuffer));                     // convert buffer to byte array
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join(''); // convert bytes to hex string
  return hashHex;
}

fileSelect.addEventListener("click", function (e) 
{
  if (fileElem)
  {
    fileElem.click();
  }
}, false);

const inputElement = document.getElementById("fileElem");
inputElement.addEventListener("change", handleFiles, false);

function handleFiles() 
{
  document.getElementById("hashtoregister").value = "";
  document.getElementById("loaderid").style.display = "block";
  const fileList = this.files; /* now you can work with the file list */
  //document.getElementById("hashtoregister").innerHTML = fileList[0].name+ "," + fileList[0].type + "," + fileList[0].size;
  fileData = new Blob([fileList[0]]);
  var promise = new Promise(getBuffer);
  promise.then(async function (data) 
  {
    const digestHex = await digestMessage(data);
    document.getElementById("hashtoregister").value = digestHex;
    document.getElementById("loaderid").style.display = "none";
  }).catch(function (err) 
  {
    document.getElementById("hashtoregister").value = "error";
    document.getElementById("loaderid").style.display = "none";
  });
}


function openfile(evt) 
{
  var files = input.files;

  fileData = new Blob([files[0]]);

  var promise = new Promise(getBuffer);

  promise.then(function (data)
  {

    output.innerHTML = data.toString();
    //console.log(data);
  }).catch(function (err)
  {
    //console.log('Error: ', err);
  });
}

/* 
Readfile into buffer
*/
function getBuffer(resolve) 
{
  var reader = new FileReader();
  reader.readAsArrayBuffer(fileData);
  reader.onload = function ()
  {
    var arrayBuffer = reader.result
    var bytes = new Uint8Array(arrayBuffer);
    resolve(bytes);
  }
}