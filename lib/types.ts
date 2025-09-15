// Types for container management
export interface ContainerMapping {
  [tld: string]: string; // TLD -> container name
}

export interface ContainerInfo {
  cookieStoreId: string;
  name: string;
  color: string;
  icon: string;
}

export interface StorageData {
  containerMappings: ContainerMapping;
}