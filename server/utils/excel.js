import ExcelJS from 'exceljs';
import fs from 'fs';
import path from 'path';

export const excelPath = () => path.resolve(process.env.EXCEL_PATH || './data/messages.xlsx');
let queue = Promise.resolve(); // serialise writes so simultaneous visitors don't corrupt the file

export function saveToExcel({ name, email, subject, message }) {
  const job = queue.then(async () => {
    const file = excelPath();
    fs.mkdirSync(path.dirname(file), { recursive: true });
    const wb = new ExcelJS.Workbook();
    let ws;
    if (fs.existsSync(file)) { await wb.xlsx.readFile(file); ws = wb.getWorksheet('Messages'); }
    if (!ws) {
      ws = wb.addWorksheet('Messages');
      ws.columns = [
        { header: 'Date & Time', key: 'date', width: 22 }, { header: 'Name', key: 'name', width: 24 },
        { header: 'Email', key: 'email', width: 32 }, { header: 'Subject', key: 'subject', width: 30 },
        { header: 'Message', key: 'message', width: 70 },
      ];
      ws.getRow(1).font = { bold: true };
    }
    ws.addRow({ date: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }), name, email, subject, message });
    await wb.xlsx.writeFile(file);
  });
  queue = job.catch(() => {});
  return job;
}
