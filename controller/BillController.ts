import { Env } from '../src/index';

export interface Bill {
	id: number;
	name: string;
	amount: number;
	category: string;
	createTime: string;
}

export async function getAllBill(env: Env) {
	const { results } = await env.DB.prepare('select * from bill').all();
	const bills: Bill[] = results.map((row: any) => ({
		id: row.id,
		name: row.name,
		amount: row.amount,
		category: row.category,
		createTime: row.create_time, // 映射 create_time 到 createTime
	}));
	return new Response(JSON.stringify(bills), {
		//allow CORS
		headers: { 'content-type': 'application/json', 'Access-Control-Allow-Origin': '*' },
	});
}
export async function addBill(env: Env, billData: Bill) {
	const { results } = await env.DB.prepare('INSERT INTO bill (name, amount, category, create_time) VALUES (?, ?, ?, ?)')
		.bind(billData.name, billData.amount, billData.category, billData.createTime)
		.all();
	return new Response('1', {
		headers: { 'content-type': 'application/json', 'Access-Control-Allow-Origin': '*' },
	});
}

export async function getMonthlyTotalAmount(env: Env) {
	const now = new Date();
	const firstDay = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split('T')[0];
	const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString().split('T')[0];

	const { results } = await env.DB.prepare('SELECT SUM(amount) as totalAmount FROM bill WHERE create_time BETWEEN ? AND ?')
		.bind(firstDay + ' 00:00:00', lastDay + ' 23:59:59')
		.all();

	const totalAmount = results[0]?.totalAmount || 0;

	return new Response(JSON.stringify(totalAmount), {
		headers: { 'content-type': 'application/json', 'Access-Control-Allow-Origin': '*' },
	});
}
