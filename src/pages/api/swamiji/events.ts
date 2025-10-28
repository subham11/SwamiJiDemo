import type { NextApiRequest, NextApiResponse } from 'next';
import { MockSwamiJiRepository } from '@/infrastructure/api/MockSwamiJiRepository';
import { GetEventsUseCase } from '@/application/useCases/SwamiJiUseCases';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      const repository = new MockSwamiJiRepository();
      const useCase = new GetEventsUseCase(repository);
      const events = await useCase.execute();
      
      res.status(200).json(events);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch events' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
