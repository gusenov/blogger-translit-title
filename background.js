chrome.browserAction.onClicked.addListener(function (tab) {
    var action_url = "https://www.blogger.com";
    chrome.tabs.create({
        url: action_url
        
    });
});
