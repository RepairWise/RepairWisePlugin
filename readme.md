# RepairWise Plugin

A simple web application that has the RepairWise Angular Plugin embedded.

## Contents

* [Integration](#integration)
* [Styling](#styling)
* [OAuth](#oauth)

## Integration

### Setup

In your `index.html` add a reference to our plugin.

```html
<head>

  <!-- Any other tags you want -->

  <script src="https://plugin.repairwise.com/repairwise-embed.bundle.js"></script>
</head>
```

Next, add the `<rw-main>` tag where you want the plugin imbedded on the page

```html
<body>
  <rw-main>Loading...</rw-main>
</body>
```

Initializing the plugin takes 2 steps. First, call `window.RepairWise({})` with the callback functions and initialization variables you want. This will return a builder object that you can call `start({})` on. Depending on what you pass to `start`, RepairWise will start in different modes. In this sample project, we included a file `utils.js` that contains sample values for initial variables and callbacks.

```html
</body>
<script>
  // How to start the plugin and load it
  var repairWise = window.RepairWise({
    getToken: getToken,
    onCloseUrl: redirectUrl,
    onCloseRepairWise: onCloseRepairWise,
    saveProjectInfo: saveProjectInfo,
  })

  if (projectId) {
    repairWise.start({ startingProjectId: projectId })
  } else if (address) {
    repairWise.start({ startingAddress: address })
  } else {
    repairWise.start()
  }
</script>
```

### Parameters

The `getToken` callback method is required for the plugin to work.

```javascript
  function getToken() {
    // callback to your OAuth resource
  }
```

For more information on OAuth and getting a token read [OAuth](#oauth).

The `onCloseUrl` redirect is optional. Adding it will add a `Close` button in the top right that redirects the user to the provided url

The `onCloseRepairWise` callback function will be called as repairwise is closing. It takes no parameters and returns nothing.

```javascript
function onCloseRepairWise()
{
  console.log("Closing RepairWise, please save any information");
}
```

The `saveProjectInfo` callback is called when a new project is created in RepairWise.

Note: This will happen right after the user puts in an address. If you started RepairWise with an address, the project is created as RepairWise starts up. If the address has invalid information, like a bad postal code, the user will be taken to the address entry screen and this callback will be called after the correct address is entered. If you start RepairWise with a projectId, this callback will not be called unless the the get for the project with that id fails for some reason. If the project with the id could not be loaded, the user will be taken to the address entry screen and this callback will be called after the address is entered and a new project is created. In other words, even in the case of starting with a potentially good project id, you should be prepared to re-store a new project id just in the case the one provided is bad.

```javascript
function saveProjectInfo(reportInfo) {
  console.log(reportInfo.projectId)

  console.log(reportInfo.address.propertyNumber);
  console.log(reportInfo.address.street);
  console.log(reportInfo.address.city);
  console.log(reportInfo.address.stateProvince);
  console.log(reportInfo.address.postalCode);
  console.log(reportInfo.address.country);
}
```

Upgrading Note: The callback `saveProjectInfo` is intended to replace the callback `saveReportInfo`. We recommend saving the project id's instead of the old report URLs. With the project id saved, you can do many operations like downloading reports by passing the project id as a url parameter to various endpoints of our api (eg `http://repairwise.com/api/reports/download?version=1.0&id={projectId}`). Saving the old report download URLs could eventually lead to outdated URLs.

The `startingAddress` parameter lets you start RepairWise and skip the address entry screen. Pass in an object that contains the following required fields:

* `stateProvince` can be the two letter abbreviation (UT) or the full name (Utah)
* `postalCode` must be in the correct format
* `country` can be the two letter abbreviation (US), the three letter country code (USA) or the full name (United States)

A more complete address can be provided and will show up on generated reports and other locations.

```javascript
{
  propertyNumber: string,
  street: string,
  city: string,
  stateProvince: string,
  postalCode: string,
  country: string
}
```

The `startingProjectId` parameter lets you re-load a project of the past. It should take the form of a GUID string.

```javascript
var startingProjectId = "1ebd2703-1d2c-497e-b616-a997000beaf0"
```

Note: If both `startingProjectId` and `startingAddress` are provided to the `start({startingProjectId, startingAddress})` function, you will get an error. Only provide one or the other or make sure that one of them is `null` or `undefined`.

## Styling

It is requires that you add the provided style sheet `repairwise-style.css` to the root of your website.

Ensure that both yours and our style sheets are include in the `index.html`.

```html
    <link rel="stylesheet" type="text/css" href="repairwise-style.css" />
    <link rel="stylesheet" type="text/css" href="styles/main.css" />
```

The colors of the plugin can be customized to fit the style of your website. We have provided a style sheet `repairwise-style.css`.

For example to change the color of the header, open the `repairwise-style.css` file and go to.

```css
.rw-header {
  /*
    Thin header trim
  */
  background-color: #032D4C;
}
```

Change the color to `#F2F2F2`, for example

```css
.rw-header {
  /*
    Thin header trim
  */
  background-color: #F2F2F2;
}
```

It is critical to mention that none of the `.css` classes can be renamed.

## OAuth

RepairWise will authenticate all network requests using a client credential grant workflow.

You will need to create your own function that performs a post request to https://identity.verisk.com/connect/token with the following parameters:

```text
"client_id", "repairwise"

"client_secret", <-- Your secret key -->

"grant_type", "client_credentials"

"scope", "rw_api"
```

Your post request must return a `Promise` that resolves to a string. This will be your token that will be appended to all requests in the plugin.