/* eslint-disable */
declare module "*.vue" {
	import { defineComponent } from "vue";
	const Component: ReturnType<typeof defineComponent>;
	export default Component;
}

declare module '*.json' {
  const value: any;
  export default value;
}
declare module 'xxx'