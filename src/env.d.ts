/// <reference types="vite/client" />

// Tell TypeScript how to handle *.vue imports so components are typed correctly.
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<object, object, unknown>
  export default component
}
