import { DearestRepository } from './repository/dearestRepository';
import { DearestApplicationService } from './application/service/dearestApplicationService';
import { DearestClient } from './client/dearestClient';

function main(): void {
  const dearestRepository = new DearestRepository();
  const dearestApplicationService = new DearestApplicationService(dearestRepository);
  const dearestClient = new DearestClient(dearestApplicationService);
  dearestClient.postMessage();
};
