import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as session from 'express-session';

async function bootstrap() {
  const PORT = process.env.PORT || 3000;
  const app = await NestFactory.create(AppModule);

  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Performers')
    .setDescription('Performers REST API')
    .setVersion('0.0.1')
    .addTag('PER-CAM')
    .build();

  app.enableCors({
    origin: 'http://localhost:4200', // Разрешить запросы с этого домена
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true, // Разрешить отправку куков и заголовков авторизации
  });

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('/admin/endpoints', app, document);

  await app.listen(PORT, () => console.log(`RUN ON  ${PORT} PORT`));
}
bootstrap();
