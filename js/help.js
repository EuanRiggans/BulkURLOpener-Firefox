$(document).ready(function () {
    $('#closeModal').click(function () {
        alert("Unable to close window due to Firefox security policy. Please close this window manually.");
        // window.close();
    });
    $('#openChangelog').click(function () {
        browser.tabs.create({
            active: true,
            'url': chrome.extension.getURL('changelog.html')
        });
    });
});
