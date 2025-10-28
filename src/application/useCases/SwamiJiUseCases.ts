import { ISwamiJiRepository } from '@/domain/repositories/ISwamiJiRepository';
import { SwamiJi } from '@/domain/entities/SwamiJi';

export class GetSwamiJiInfoUseCase {
  constructor(private repository: ISwamiJiRepository) {}

  async execute(): Promise<SwamiJi> {
    return await this.repository.getSwamiJiInfo();
  }
}

export class GetTeachingsUseCase {
  constructor(private repository: ISwamiJiRepository) {}

  async execute() {
    return await this.repository.getTeachings();
  }
}

export class GetQuotesUseCase {
  constructor(private repository: ISwamiJiRepository) {}

  async execute() {
    return await this.repository.getQuotes();
  }
}

export class GetEventsUseCase {
  constructor(private repository: ISwamiJiRepository) {}

  async execute() {
    return await this.repository.getEvents();
  }
}
