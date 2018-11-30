function getToken() {
  // callback to your OAuth resource
}

// Callback parameter 'reportInfo' is an object of the form:
//   {
//     address: {city: string, country: string, postalCode: string, propertyNumber: string, stateProvince: string, street: string},
//     projectId: string
//   }
function saveProjectInfo(reportInfo) {
  console.log("Called saveProjectInfo in Parent: ")
  console.log(reportInfo.address)
  console.log(`ProjectId: ${reportInfo.projectId}`)
}

address = null
/*address = {
  propertyNumber: "1100 W",
  street: "Traverse Pkwy",
  city: "Lehi",
  stateProvince: "UT",
  postalCode: "84043",
  country: "USA"
}*/

projectId = null
//projectId = "1ebd2703-1d2c-497e-b616-a997000beaf0"

redirectUrl = "https://www.google.com/"

function onCloseRepairWise()
{
  console.log("Closing RepairWise, please save any information");
}