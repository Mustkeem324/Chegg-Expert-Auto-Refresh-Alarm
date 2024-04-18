
chrome.runtime.onInstalled.addListener(function() {
    let numbers = [];
    for (let i = 1; i <= 10000; i++) {
        numbers.push(i);
    }
    chrome.declarativeNetRequest.updateDynamicRules({
        removeRuleIds : numbers
    });
    
    console.log("Extension installed or updated");
    const ruleId = parseInt(Date.now()) % 10000; // Generate a unique ID using current timestamp
    const rule = { // Use timestamp directly as ID
        id: ruleId,
        priority: 1,
        action: {
            type: "block"
        },
        condition: {
            urlFilter: 'https://brainly*/question/*',
            resourceTypes: ["script"]
        }
    };

    // Add the rule
    chrome.declarativeNetRequest.updateDynamicRules({
        addRules: [rule]
    }, () => {
        console.log("Rule added");
    });
});

  
  
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.type === 'notifysolutioniinn') {
        chrome.notifications.create({
            type: 'basic',
            iconUrl: '../icon.png',
            title: 'Solutioninn Link Copied',
            message: 'Solutioninn link has been copied, Paste(ctrl+v) it in @vipfreesolbot on telegram to get answer.'
        });
        console.log("notification sent")
    }
});


chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.type === 'brainly') {
    chrome.webRequest.onCompleted.addListener(
        function(details) {
        // Log requests and their response texts
        console.log("Request URL: " + details.url);
        console.log("Response Text: " + details.responseText);
        },
        { urls: ["<all_urls>"] }
    );
}

});
