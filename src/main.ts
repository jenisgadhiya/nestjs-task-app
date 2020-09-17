import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import * as config from 'config'

async function bootstrap() {
  const serverconfig=config.get('server')
  const logger=new Logger('bootstrap')
  const app = await NestFactory.create(AppModule);
  
  const port=process.env.PORT || serverconfig.port
  await app.listen(port);
  logger.log(`application listening on port ${port}`)
}
bootstrap();
