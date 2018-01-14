$(document).ready(function () {    
    var getCurrentlyOpenedTabs = browser.tabs.query({});
    getCurrentlyOpenedTabs.then(getCurrentTabs, onError);
    $('#openButton').click(function () {
        openTextAreaList();
    });
    $('#copyCurrentOpen').click(function () {
        var getCurrentlyOpenedTabs = browser.tabs.query({});
        getCurrentlyOpenedTabs.then(getCurrentTabs, onError);
    });
    $('#clearList').click(function () {
        clearLinksList();
    });
    $('#createNewList').click(function () {
        openSaveNewListDialog();
    });
    $('#openList').click(function () {
        openSelectedList();
    });
    $('#editList').click(function () {
        editSelectedList();
    });
    $('#deleteList').click(function () {
        deleteList();
    });
    $('#openSettings').click(function () {
        openSettingsDialog();
    });
    $('#openHelp').click(function () {
        openHelpDialog();
    });
    $('#version').text("- Version " + getCurrentVersion());
});

function openTextAreaList() {
    openList(document.getElementById("list").value);
}

function getCurrentTabs(tabs) {
    var tabsArray = new Array();
    for (let tab of tabs) {
        tabsArray.push(tab.url);
    }
    if (!tabsArray.length) {
        return;
    }
    var listTextArea = document.getElementById("list");
    clearLinksList();
    for (var i = 0; i < tabs.length; ++i) {
        listTextArea.value += tabsArray[i] + "\n";
    }
    listTextArea.select();
}
  
function onError(error) {
    console.log(`Error: ${error}`);
}

function clearLinksList() {
    var listTextArea = document.getElementById("list");
    listTextArea.value = "";
}

String.prototype.trim = function() { 
	return this.replace(/^\s+|\s+$/g, ''); 
}

function isProbablyUrl(string) {
	var substr = string.substring(0,4).toLowerCase();
	if (substr == 'ftp:' || substr == 'www.') {
        return true;
    }

	var substr = string.substring(0,5).toLowerCase();
	if (substr == 'http:') {
        return true;
    }

	var substr = string.substring(0,6).toLowerCase();
	if (substr == 'https:') {
        return true;
    }

	var substr = string.substring(0,7).toLowerCase();
	if (substr == 'chrome:') {
        return true;
    }

	return false;
}

function openList(list) {
    var strings = list.split(/\r\n|\r|\n/);
    for (var i = 0; i<strings.length; i++) {
        if(strings[i].trim() == '') {
            strings.splice(i, 1);
            i--;
        }
    }
    tabCreationDelay = 0;        
    linksIterator(0, strings, tabCreationDelay);  
}

function linksIterator(i, strings, tabCreationDelay) {    
    strings[i] = strings[i].trim();
    if (strings[i] == '') {
        return;
    }
    var url = strings[i];
    if (!isProbablyUrl(url)) {
        url = 'http://www.google.com/search?q=' + encodeURI(url);
    }
    chrome.tabs.create({'url':url,'active':false});
    i++;
    if(i < strings.length){
        setTimeout(linksIterator, tabCreationDelay, i, strings, tabCreationDelay);
    }
}

function getCurrentVersion() {
    var manifestData = chrome.runtime.getManifest();
    return(manifestData.version);
}