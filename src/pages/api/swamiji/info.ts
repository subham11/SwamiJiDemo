import type { NextApiRequest, NextApiResponse } from 'next';
import { MockSwamiJiRepository } from '@/infrastructure/api/MockSwamiJiRepository';
import { GetSwamiJiInfoUseCase } from '@/application/useCases/SwamiJiUseCases';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      const repository = new MockSwamiJiRepository();
      const useCase = new GetSwamiJiInfoUseCase(repository);
      const info = await useCase.execute();
      
      res.status(200).json(info);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch Swami Ji information' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
