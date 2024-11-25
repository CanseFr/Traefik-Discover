import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import {Ctx, EventPattern, Payload, RmqContext} from "@nestjs/microservices";

@Controller('mail')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    console.log('_____________________________________');
    console.log('Hello get AppController Mail Service ');
    console.log('_____________________________________');
    return this.appService.getHello();
  }

  @EventPattern('hello') // Le nom de l'événement à écouter
  async handleEmailSending(
      @Payload() payload: any, // Remplacez 'any' par le type spécifique du payload si nécessaire
      @Ctx() context: RmqContext,
  ) {
    const channel = context.getChannelRef(); // Récupérer le canal RabbitMQ
    const originalMsg = context.getMessage(); // Récupérer le message original

    try {
      console.log('Sending email with payload:', payload);
      // Logique pour envoyer l'email
      // await this.emailService.sendEmail(payload); // Utilisez votre service d'email ici

      channel.ack(originalMsg); // Accuser réception du message
    } catch (error) {
      console.error('Error sending email:', error);
      // Optionnel : Ne pas accuser réception pour renvoyer le message à RabbitMQ en cas d'erreur
      // channel.nack(originalMsg);
    }
  }

}
