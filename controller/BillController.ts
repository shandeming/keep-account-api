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
		headers: { 'content-type': 'application/json', 'Access-Control-Allow-Origin': '*' },
	});
}
export async function addBill(env: Env, billData: Bill) {
	console.log(billData);
	const { results } = await env.DB.prepare('INSERT INTO bill (name, amount, category, create_time) VALUES (?, ?, ?, ?)')
		.bind(billData.name, billData.amount, billData.category, billData.createTime)
		.all();
	return new Response(JSON.stringify(results), {
		headers: { 'content-type': 'application/json' },
	});
}
