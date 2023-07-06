import { defineConfig } from "vite";
import { resolve } from 'path'

export default defineConfig({
	appType: 'mpa',
	build: {
		cssCodeSplit: false,
		rollupOptions: {
		  input: {
			 main: resolve(__dirname, 'index.html'),
			 polynom: resolve(__dirname, 'polynominterpolation/index.html'),
			 hermite: resolve(__dirname, 'hermite/index.html'),
			 bezier: resolve(__dirname, 'bezier/index.html'),
		  },
		},
	 },
})