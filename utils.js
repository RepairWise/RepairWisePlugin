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