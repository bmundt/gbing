
function iframeLoaded() {
  console.log("here");
  var iFrameID = document.getElementById('bingRewards');
  if (iFrameID) {
    iFrameID.height = iFrameID.contentWindow.document.body.scrollHeight + "px";
  }
}
