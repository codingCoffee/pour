import { StorageService } from '../lib/services/storage';
import { ContainerService } from '../lib/services/containers';

export default defineBackground(() => {
  console.log('Container Manager background script loaded');

  // Listen for tab creation/navigation events
  browser.tabs.onCreated.addListener(handleTabCreated);
  browser.tabs.onUpdated.addListener(handleTabUpdated);

  async function handleTabCreated(tab: any) {
    if (tab.url) {
      await redirectToContainer(tab);
    }
  }

  async function handleTabUpdated(
    _tabId: number,
    changeInfo: any,
    tab: any
  ) {
    if (changeInfo.url && tab.url) {
      await redirectToContainer(tab);
    }
  }

  async function redirectToContainer(tab: any) {
    if (!tab.url || !tab.id) return;

    try {
      const domain = ContainerService.extractDomain(tab.url);
      if (!domain) return;

      const mappings = await StorageService.getContainerMappings();
      const containerName = mappings[domain];

      if (!containerName) return;

      const container = await ContainerService.getContainerByName(containerName);
      if (!container) {
        console.warn(`Container "${containerName}" not found for domain "${domain}"`);
        return;
      }

      if (tab.cookieStoreId === container.cookieStoreId) return;

      await browser.tabs.remove(tab.id);
      await ContainerService.createTab(tab.url, container.cookieStoreId);

      console.log(`Redirected ${domain} to container: ${containerName}`);
    } catch (error) {
      console.error('Error redirecting tab to container:', error);
    }
  }
});
