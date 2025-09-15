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

  static async addMapping(domain: string, containerName: string): Promise<void> {
    const mappings = await this.getContainerMappings();
    mappings[domain] = containerName;
    await this.setContainerMappings(mappings);
  }

  static async removeMapping(domain: string): Promise<void> {
    const mappings = await this.getContainerMappings();
    delete mappings[domain];
    await this.setContainerMappings(mappings);
  }

  static async exportMappings(): Promise<string> {
    const mappings = await this.getContainerMappings();
    return JSON.stringify(mappings, null, 2);
  }

  static async importMappings(jsonData: string): Promise<void> {
    try {
      const newMappings = JSON.parse(jsonData) as ContainerMapping;
      const existingMappings = await this.getContainerMappings();
      const mergedMappings = { ...existingMappings, ...newMappings };
      await this.setContainerMappings(mergedMappings);
    } catch (error) {
      throw new Error('Invalid JSON format');
    }
  }

  static async clearAllMappings(): Promise<void> {
    await this.setContainerMappings({});
  }
}