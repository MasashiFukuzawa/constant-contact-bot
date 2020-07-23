import { DearestRepository } from './repository/dearestRepository';
import { DearestApplicationService } from './application/service/dearestApplicationService';
import { Client } from './client/client';

function main(): void {
  const dearestRepository = new DearestRepository();
  const dearestApplicationService = new DearestApplicationService(dearestRepository);
  const client = new Client(dearestApplicationService);
  client.postMessage();
};
