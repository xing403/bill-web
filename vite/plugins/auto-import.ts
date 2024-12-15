import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://github.com/antfu/unplugin-auto-import
export default function createAutoImport() {
  return AutoImport({
    imports: [
      'vue',
      'vue-router',
      '@vueuse/core',
    ],
    resolvers: [
      ElementPlusResolver(),
    ],
    dts: 'src/types/auto-import.d.ts',
    dirs: [
      './src/api/modules',
      './src/store/modules',
    ],
    vueTemplate: true,
  })
}
