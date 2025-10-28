import { SwamiJi, Teaching, Quote, Event } from '../entities/SwamiJi';

// Repository Interface (Port)
export interface ISwamiJiRepository {
  getSwamiJiInfo(): Promise<SwamiJi>;
  getTeachings(): Promise<Teaching[]>;
  getQuotes(): Promise<Quote[]>;
  getEvents(): Promise<Event[]>;
}
