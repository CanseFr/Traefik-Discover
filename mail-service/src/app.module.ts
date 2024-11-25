import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {MailService} from "./mail/mail.service";

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'RABBITMQ_SERVICE',  // Nom du client RabbitMQ
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://user:password@rabbitmq'],  // Assurez-vous que l'URL correspond à votre configuration
          queue: 'hello',               // Nom de la queue
          queueOptions: {
            durable: true,  // Queues durables pour la persistance
          },
          prefetchCount: 1,  // Limiter le nombre de messages non confirmés
          noAck: false,      // Acknowledgements manuels
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService, MailService],  // Assurez-vous que MailService est ici
})
export class AppModule {}
