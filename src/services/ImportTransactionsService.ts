import { resolve } from 'path';
import loadCSV from '../lib/loadCSV';

import Transaction from '../models/Transaction';
import CreateTransactionService from './CreateTransactionService';

import uploadConfig from '../config/uploads';

interface Filedata {
  title: string;
  type: 'income' | 'outcome';
  value: number;
  category: string;
}

class ImportTransactionsService {
  // Promise<Transaction[]>
  async execute(filepath: string): Promise<Transaction[]> {
    const createTransaction = new CreateTransactionService();

    const csvPath = resolve(filepath);
    const csvData = await loadCSV(csvPath);

    const transactions = [];
    for await (const data of csvData) {
      const { ...rest } = await createTransaction.execute({
        title: data[0],
        type: data[1],
        value: data[2],
        category: data[3],
      });
      transactions.push(rest);
    }
    return transactions;
  }
}

export default ImportTransactionsService;
