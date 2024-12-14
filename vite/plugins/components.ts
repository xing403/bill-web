import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://github.com/antfu/vite-plugin-components

export default function createComponents() {
  return Components({
    resolvers: [
      ElementPlusResolver(),
    ],
    dts: 'src/types/components.d.ts',
  })
}
