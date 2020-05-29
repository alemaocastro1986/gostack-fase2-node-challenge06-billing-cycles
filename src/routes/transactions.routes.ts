import { getCustomRepository } from 'typeorm';
import { Router } from 'express';

import multer from 'multer';
import uploadsConfig from '../config/uploads';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';
import DeleteTransactionService from '../services/DeleteTransactionService';
import ImportTransactionsService from '../services/ImportTransactionsService';

const transactionsRouter = Router();
const uploads = multer(uploadsConfig);

transactionsRouter.get('/', async (request, response) => {
  const transactionsRepository = getCustomRepository(TransactionsRepository);

  const transactions = await transactionsRepository.find();
  const balance = await transactionsRepository.getBalance();

  return response.json({ transactions, balance });
});

transactionsRouter.post('/', async (request, response) => {
  const { title, value, type, category } = request.body;

  const createTransacion = new CreateTransactionService();
  const transaction = await createTransacion.execute({
    title,
    type,
    value,
    category,
  });

  return response.json(transaction);
});

transactionsRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;

  const deleteTransiction = new DeleteTransactionService();
  await deleteTransiction.execute({ id });

  return response.status(204).json();
});

transactionsRouter.post(
  '/import',
  uploads.single('file'),
  async (request, response) => {
    const importTransactions = new ImportTransactionsService();
    const transactions = await importTransactions.execute(request.file.path);

    response.json(transactions);
  },
);

export default transactionsRouter;
