const xlsx = require('xlsx');
const fs = require('fs');

// 读取 Excel 文件
const workbook = xlsx.readFile('Expenditure-Weekly.xlsx');
const sheetName = workbook.SheetNames[0]; // 获取第一个工作表的名称
const worksheet = workbook.Sheets[sheetName];

// 将工作表转换为 JSON 格式
const jsonData = xlsx.utils.sheet_to_json(worksheet);

// 提取所需的列
const extractedData = jsonData.map((row) => ({
	name: row['说明'],
	amount: row['金额'],
	category: row['分类'],
	createTime: '2024-10-01 00:00:00',
}));

// 将提取的数据写入文本文件
const output = extractedData.map((item) => `( '${item.name}',  ${item.amount},  '${item.category}', '${item.createTime}')`).join(',\n');

fs.writeFileSync('output.txt', output);

console.log('数据已成功写入 output.txt');
