# gbing
Make google searches also search bing, to get bing rewards without using bing.

# Installation

1. In chrome go to chrome://extensions
2. Check the box in the upper right hand corner labeled "developer mode"
3. Click the button labeled "Load unpacked extension", browse to the "gbing"
  folder you downloaded and click "OK".

# Known Issues
For some reason, just modifying your search from the google search bar, does
not trigger a new request from the google web request api, so it doesn't get
detected, and thus a request won't be sent to bing.
