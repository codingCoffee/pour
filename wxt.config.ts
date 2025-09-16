import { defineConfig } from 'wxt';

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ['@wxt-dev/module-react'],
  manifest: {
    name: 'Pour',
    description: 'Automatically open websites in specified Firefox containers based on domain',
    permissions: [
      'storage',
      'tabs',
      'contextualIdentities',
      'cookies'
    ],
    browser_specific_settings: {
      gecko: {
        id: 'pour@codingcoffee.me',
        strict_min_version: '58.0',
        data_collection_permissions: {
          required: ["none"],
        }
      }
    }
  }
});
