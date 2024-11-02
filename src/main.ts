import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as session from 'express-session';
import { config } from 'dotenv';


config();
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors()

  app.useStaticAssets(join(__dirname, '..','src', 'public'));
  app.setBaseViewsDir(join(__dirname,'..', 'src', 'views'));
  app.setViewEngine('hbs');

  app.use(
    session({
      secret: process.env.SESSION_SECRET ||'default_secret_key',
      resave: false,
      saveUninitialized: false,
      cookie: { secure: 'auto' },
    }),
  );

  await app.listen(3000);
}
bootstrap();
