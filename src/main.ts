import { DearestRepository } from './repository/dearest_repository';
import { DearestApplicationService } from './application/service/dearest_application_service';
import { DearestClient } from './client/dearest_client';

function main(): void {
  const dearestRepository = new DearestRepository();
  const dearestApplicationService = new DearestApplicationService(dearestRepository);
  const dearestClient = new DearestClient(dearestApplicationService);
  dearestClient.postMessages();
};
