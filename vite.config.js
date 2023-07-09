import { defineConfig } from "vite";
import { resolve } from 'path'
import { JSDOM } from 'jsdom'

const anchorBasePlugin = () => {
	let config

	return {
		name: 'anchor-base',
		configResolved(resolvedConfig) {
			config = resolvedConfig
		},
		transformIndexHtml(html) {
			const basePath = config.base

			const jsdom = new JSDOM(html)
			const anchors = Array.from(jsdom.window.document.querySelectorAll('a[href]'))
			for (const a of anchors) {
				let href = a.href
				if (href.startsWith('/')) {
					href = resolve(basePath, href.slice(1))
					a.href = href
				}
			}
			return jsdom.serialize()
		}
	}
}

export default defineConfig({
	appType: 'mpa',
	plugins: [anchorBasePlugin()],
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