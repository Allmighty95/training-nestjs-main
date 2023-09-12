import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cors from 'cors';
import * as Express from 'express';

import { AppModule } from './app.module';
import { mainDocs } from './docs';
import { ExpressAdapter } from '@nestjs/platform-express';
import { UserModule } from './user/user.module';
import { userDocs } from './user/docs';
import { AuthModule } from './auth/auth.module';
import { authDocs } from './auth/docs';
import { placesDocs } from './places/docs';
import { PlacesModule } from './places/places.module';

const server = Express();
server.use(cors());

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.setGlobalPrefix('api');
  app.enableCors();

  if (process.env.ENV !== 'prod') {
    SwaggerModule.setup(
      'docs',
      app,
      SwaggerModule.createDocument(
        app,
        new DocumentBuilder()
          .setTitle('training-nestjs-api')
          .setDescription(`${mainDocs}`)
          .setVersion('1.0.0')
          .build(),
      ),
    );

    SwaggerModule.setup(
      'docs/user',
      app,
      SwaggerModule.createDocument(
        app,
        new DocumentBuilder()
          .setTitle('user')
          .setDescription(`${userDocs}`)
          .setVersion('1.0.0')
          .addBearerAuth({
            type: `http`,
            scheme: `bearer`,
            bearerFormat: `JWT`,
            description: `JWT Token`,
          })
          .addServer('http://localhost:5000', `Local server`)
          .build(),
        { include: [UserModule] },
      ),
    );

    SwaggerModule.setup(
      'docs/auth',
      app,
      SwaggerModule.createDocument(
        app,
        new DocumentBuilder()
          .setTitle('auth')
          .setDescription(`${authDocs}`)
          .setVersion('1.0.0')
          .addBearerAuth({
            type: `http`,
            scheme: `bearer`,
            bearerFormat: `JWT`,
            description: `JWT Token`,
          })
          .addServer('http://localhost:5000', `Local server`)
          .build(),
        { include: [AuthModule] },
      ),
    );

    
    SwaggerModule.setup(
      'docs/places',
      app,
      SwaggerModule.createDocument(
        app,
        new DocumentBuilder()
          .setTitle('places')
          .setDescription(`${placesDocs}`)
          .setVersion('1.0.0')
          .addBearerAuth({
            type: `http`,
            scheme: `bearer`,
            bearerFormat: `JWT`,
            description: `JWT Token`,
          })
          .addServer('http://localhost:5000', `Local server`)
          .build(),
        { include: [PlacesModule] },
      ),
    );
  }

  await app.listen(parseInt(process.env.API_PORT) || 5000);
}
bootstrap();
