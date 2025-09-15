import { StorageService } from '../lib/services/storage';
import { ContainerService } from '../lib/services/containers';

export default defineBackground(() => {
  console.log('Container Manager background script loaded');

  // Listen for tab creation/navigation events
  browser.tabs.onCreated.addListener(handleTabCreated);
  browser.tabs.onUpdated.addListener(handleTabUpdated);

  async function handleTabCreated(tab: any) {
    if (tab.url && !tab.cookieStoreId) {
      await redirectToContainer(tab);
    }
  }

  async function handleTabUpdated(
    tabId: number, 
    changeInfo: any, 
    tab: any
  ) {
    // Only handle navigation changes with new URLs
    if (changeInfo.url && tab.url && !isContainerTab(tab)) {
      await redirectToContainer(tab);
    }
  }

  async function redirectToContainer(tab: any) {
    if (!tab.url || !tab.id) return;

    try {
      const tld = ContainerService.extractTLD(tab.url);
      if (!tld) return;

      const mappings = await StorageService.getContainerMappings();
      const containerName = mappings[tld];
      
      if (!containerName) return;

      const container = await ContainerService.getContainerByName(containerName);
      if (!container) {
        console.warn(`Container "${containerName}" not found for TLD "${tld}"`);
        return;
      }

      // Close the original tab and open in container
      await browser.tabs.remove(tab.id);
      await ContainerService.createTab(tab.url, container.cookieStoreId);
      
      console.log(`Redirected ${tld} to container: ${containerName}`);
    } catch (error) {
      console.error('Error redirecting tab to container:', error);
    }
  }

  function isContainerTab(tab: any): boolean {
    return tab.cookieStoreId !== undefined && 
           tab.cookieStoreId !== 'firefox-default';
  }
});
