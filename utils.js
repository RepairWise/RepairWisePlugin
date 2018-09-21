function getRemoteResource(path) {
    return new Promise(function(resolve) {
      var httpRequest = new XMLHttpRequest()
      httpRequest.onreadystatechange = function () {
        if (httpRequest.readyState === 4) {
          if (httpRequest.status === 200) {
            resolve(JSON.parse(httpRequest.responseText))
          }
        }
      }
      httpRequest.open('GET', path)
      httpRequest.send()
    })
}
  
function getToken() {
  // callback to your OAuth resource
}

function saveReportInfo(addressJson, linkToReport) 
{ 
   console.log(addressJson.propertyNumber); 
   console.log(addressJson.street); 
   console.log(addressJson.city); 
   console.log(addressJson.stateProvince); 
   console.log(addressJson.postalCode); 
   console.log(addressJson.country); 
  
   console.log(linkToReport); 
}

address = {
  "propertyNumber": "12345",
  "street": "North Some Street South",
  "city": "Some City",
  "stateProvince": "Some State",
  "postalCode": "98765",
  "country": "USA"
}

redirectUrl = "https://www.google.com/"

function onCloseRepairWise() 
{ 
   console.log("Closing RepairWise, please save any information"); 
}