const BINGBASE = "https://bing.com";
const SEARCH = "/search?";
chrome.webRequest.onBeforeSendHeaders.addListener(
  function(details) {
    console.log("Bing Search");
    for (var i = 0; i < details.requestHeaders.length; ++i) {
      /*if (details.requestHeaders[i].name === 'User-Agent') {
        details.requestHeaders[i].value = 'Mozilla/5.0 (Linux; <Android Version>; <Build Tag etc.>) AppleWebKit/<WebKit Rev> (KHTML, like Gecko) Chrome/<Chrome Rev> Mobile Safari/<WebKit Rev>';
      }*/
    }
    console.log(details);
    return { requestHeaders : details.requestHeaders };
  },
  {urls : ["*://*.bing.com/search?*"]},
  ["blocking", "requestHeaders"]
);

chrome.webRequest.onCompleted.addListener(
  function(details) {
    var searches = { "pc" : -1, "mobile" : -1 };
    console.log(details.url);
    var searchParams = new URLSearchParams((new URL(details.url)).search.slice(1)).get("q");
    var req = new XMLHttpRequest();
    req.onload = function() {
      var credits = req.response.getElementById("credits");
      for (var i = 0; i < credits.children.length; i++) {
        var child = credits.children[i];
        if (child.className === "breakdown") {
          for (var j = 0; j < child.children.length; j++) {
            console.log(child.children[j].textContent);
            var matches = child.children[j].textContent.match(/(\d+)\/(\d+)(.*)$/);
            if (matches.length >= 3) {
              if (matches[3].toLowerCase().includes("pc")) {
                searches.pc = parseInt(matches[2] - parseInt(matches[1]));
              } else if (matches[3].toLowerCase().includes("mobile")) {
                searches.mobile = parseInt(matches[2] - parseInt(matches[1]));
              }
            }
          }
          var bingSearch = new URLSearchParams(
            new URL(BINGBASE + SEARCH).search.slice(1));
          bingSearch.append("q", searchParams);
          var bingSearchString = BINGBASE + SEARCH + bingSearch.toString();
          bingReq = new XMLHttpRequest();
          bingReq.open("GET", bingSearchString);
          bingReq.send();
        }
      }
    }
    req.open("GET", "http://www.bing.com/rewardsapp/bepflyoutpage?style=modular");
    req.responseType = "document"
    req.send();
    return details;
  },
  {urls: ["*://*.google.com/search?*"]}
);
