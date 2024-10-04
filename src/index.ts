/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.toml`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */
import { addBill, Bill, getAllBill } from '../controller/BillController';

export interface Env {
	// If you set another name in wrangler.toml as the value for 'binding',
	// replace "DB" with the variable name you defined.
	DB: D1Database;
}
export default {
	async fetch(request, env, ctx): Promise<Response> {
		const url = new URL(request.url);
		const path = url.pathname;
		// 路由映射对象
		const routes: { [key: string]: () => Promise<Response> } = {
			'/': async () => new Response('Hello Worker!'),
			'/getAllBill': async () => getAllBill(env),
			'/addBill': async () => {
				const bill: Bill = await request.json();
				return addBill(env, bill);
			},
		};
		// 查找并执行对应的处理函数
		const handler = routes[path];
		if (handler) {
			return await handler();
		} else {
			return new Response('Not Found', { status: 404 });
		}
	},
} satisfies ExportedHandler<Env>;
