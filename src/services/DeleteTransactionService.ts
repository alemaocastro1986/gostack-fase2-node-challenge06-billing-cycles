import { getRepository } from 'typeorm';
import AppError from '../errors/AppError';

import Transaction from '../models/Transaction';

interface RequestDTO {
  id: string;
}

class DeleteTransactionService {
  public async execute({ id }: RequestDTO): Promise<void> {
    const transictionsRepository = getRepository(Transaction);

    const transiction = await transictionsRepository.findOne(id);

    if (!transiction) {
      throw new AppError('Transiction not found');
    }
    await transictionsRepository.remove(transiction);
  }
}

export default DeleteTransactionService;
