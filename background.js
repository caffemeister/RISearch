chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
      id: "reverseSearch",
      title: "Reverse Search Image",
      contexts: ["image"]
    });
  });
  
  chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "reverseSearch") {
      chrome.storage.local.set({ imageUrl: info.srcUrl }, () => {
        chrome.action.openPopup();
      });
    }
  });
  