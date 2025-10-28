import type { NextApiRequest, NextApiResponse } from 'next';
import { MockSwamiJiRepository } from '@/infrastructure/api/MockSwamiJiRepository';
import { GetQuotesUseCase } from '@/application/useCases/SwamiJiUseCases';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      const repository = new MockSwamiJiRepository();
      const useCase = new GetQuotesUseCase(repository);
      const quotes = await useCase.execute();
      
      res.status(200).json(quotes);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch quotes' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
