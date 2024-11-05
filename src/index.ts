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
import { addBill, getAllBill, getBillByPage, getDeposit, getMonthlyTotalAmount } from '../controller/BillController';
import { authenticate } from '../util/authenticate';

import LoginController from '../controller/LoginController';
import credential from '../type/credential';
import Bill from '../type/Bill';
export interface Env {
	// If you set another name in wrangler.toml as the value for 'binding',
	// replace "DB" with the variable name you defined.
	DB: D1Database;
}
export default {
	async fetch(request, env, ctx): Promise<Response> {
		const url = new URL(request.url);
		const path = url.pathname;
		// 处理预检请求
		if (request.method === 'OPTIONS') {
			return new Response(null, {
				status: 204,
				headers: {
					'Access-Control-Allow-Origin': '*',
					'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
					'Access-Control-Allow-Headers': 'Content-Type',
				},
			});
		}
		// TODO: implement logic for login
		// // 身份验证
		// const isAuthenticated = await authenticate(request);
		// if (!isAuthenticated && path !== '/login') {
		// 	return new Response('Unauthorized', { status: 401 });
		// }

		// 路由表
		const routes: { [key: string]: () => Promise<Response> } = {
			'/': async () => new Response('Hello Worker!'),
			'/login': async () => {
				try {
					const credentials: credential = await request.json();
					const loginController = new LoginController();
					return await loginController.login(env, credentials);
				} catch (error) {
					return new Response('Invalid JSON input', { status: 400 });
				}
			},
			'/getAllBill': async () => getAllBill(env),
			'/addBill': async () => {
				try {
					const bill: Bill = await request.json();
					return addBill(env, bill);
				} catch (error) {
					return new Response('Invalid JSON input', { status: 400 });
				}
			},
			'/getMonthlyTotalAmount': async () => getMonthlyTotalAmount(env),
			'/getBillByPage': async () => getBillByPage(env, Number(url.searchParams.get('page')), Number(url.searchParams.get('pageSize'))),
			'/getDeposit': async () => getDeposit(env),
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
