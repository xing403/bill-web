// vite plugins
import type { PluginOption } from 'vite'
import Vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import createComponents from './components'
import createAutoImport from './auto-import'
import createUnocss from './unocss'

export default function useVitePlugins() {
  const plugins: (PluginOption | PluginOption[])[] = [Vue(), vueDevTools()]
  plugins.push(createComponents())
  plugins.push(createAutoImport())
  plugins.push(createUnocss())

  return plugins
}
