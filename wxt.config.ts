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
        id: 'container-manager@example.com',
        strict_min_version: '57.0'
      }
    }
  }
});
