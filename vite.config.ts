import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { FileSystemIconLoader } from 'unplugin-icons/loaders'

const pathSrc = path.resolve(__dirname, 'src')
// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': `${pathSrc}`,
    },
  },
  plugins: [
    vue(),
    AutoImport({
      // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
      imports: ['vue', '@vueuse/core', 'vue-router'],
      resolvers: [
        ElementPlusResolver(),
        // 自动导入 Element Plus 组件
        // ElementPlusResolver(),
        // 自动导入图标组件
        IconsResolver({
          prefix: 'Icon',
        }),
      ],
      dts: path.resolve(pathSrc, 'plugins', 'auto-imports.d.ts'),
    }),
    Components({
      // dirs 指定组件所在位置，默认为 src/components
      // 可以让我们使用自己定义组件的时候免去 import 的麻烦
      dirs: ['src/components/'],
      // 配置需要将哪些后缀类型的文件进行自动按需引入
      extensions: ['vue', 'md'],
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      resolvers: [
        ElementPlusResolver({
          importStyle: 'sass',
        }),
        // 自动注册图标组件
        IconsResolver({
          // enabledCollections: ['ep'], // element-plus 图标库
          customCollections: ['custom'],
          // 自动引入的Icon组件统一前缀，默认为 i，设置false为不需要前缀
          prefix: 'Icon',
        }),
      ],
    }),
    Icons({
      compiler: 'vue3',
      // 自动安装
      // autoInstall: true,
      // 自定义svg图标
      customCollections: {
        // 这里是存放svg图标的文件地址，custom是自定义图标库的名称
        // custom: FileSystemIconLoader('./src/assets/icons'),
        custom: FileSystemIconLoader('./src/assets/icons/svg', (svg) =>
          svg.replace(/^<svg /, '<svg fill="currentColor" ')
        ),
      },
      iconCustomizer(collection, icon, props) {
        const name = `${collection}:${icon}`
      },
    }),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/assets/styles/element/index.scss" as *;`,
      },
    },
  },
  // 服务配置
  server: {
    port: 17000, // 端口
    open: true, // 服务启动是否自动打开浏览器
    cors: true, // 允许跨域
  },
})
