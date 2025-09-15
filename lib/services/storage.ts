import { ContainerMapping, StorageData } from '../types';

const STORAGE_KEY = 'containerMappings';

export class StorageService {
  static async getContainerMappings(): Promise<ContainerMapping> {
    const result = await browser.storage.local.get(STORAGE_KEY);
    return result[STORAGE_KEY] || {};
  }

  static async setContainerMappings(mappings: ContainerMapping): Promise<void> {
    await browser.storage.local.set({ [STORAGE_KEY]: mappings });
  }

  static async addMapping(tld: string, containerName: string): Promise<void> {
    const mappings = await this.getContainerMappings();
    mappings[tld] = containerName;
    await this.setContainerMappings(mappings);
  }

  static async removeMapping(tld: string): Promise<void> {
    const mappings = await this.getContainerMappings();
    delete mappings[tld];
    await this.setContainerMappings(mappings);
  }

  static async exportMappings(): Promise<string> {
    const mappings = await this.getContainerMappings();
    return JSON.stringify(mappings, null, 2);
  }

  static async importMappings(jsonData: string): Promise<void> {
    try {
      const mappings = JSON.parse(jsonData) as ContainerMapping;
      await this.setContainerMappings(mappings);
    } catch (error) {
      throw new Error('Invalid JSON format');
    }
  }

  static async clearAllMappings(): Promise<void> {
    await this.setContainerMappings({});
  }
}