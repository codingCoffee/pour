import { ContainerInfo } from '../types';

export class ContainerService {
  static async getAllContainers(): Promise<ContainerInfo[]> {
    try {
      const containers = await (browser as any).contextualIdentities.query({});
      return containers.map((container: any) => ({
        cookieStoreId: container.cookieStoreId,
        name: container.name,
        color: container.color,
        icon: container.icon
      }));
    } catch (error) {
      console.error('Error fetching containers:', error);
      return [];
    }
  }

  static async getContainerByName(name: string): Promise<ContainerInfo | null> {
    const containers = await this.getAllContainers();
    return containers.find(container => container.name === name) || null;
  }

  static async createTab(url: string, cookieStoreId: string): Promise<void> {
    await browser.tabs.create({
      url,
      cookieStoreId
    } as any);
  }

  static extractDomain(url: string): string {
    try {
      const urlObj = new URL(url);
      return urlObj.hostname;
    } catch (error) {
      console.error('Error extracting domain from URL:', url, error);
      return '';
    }
  }
}