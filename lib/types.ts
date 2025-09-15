// Types for container management
export interface ContainerMapping {
  [domain: string]: string; // Domain -> container name
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