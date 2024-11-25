import { Injectable, OnModuleInit } from '@nestjs/common';
import {
  MessagePattern,
  Payload,
  Ctx,
  RmqContext,
} from '@nestjs/microservices';

@Injectable()
export class MailService implements OnModuleInit {
    onModuleInit() {
        console.log('Mail Service Initialized');
    }

    @MessagePattern('hello')  // Écoute les messages sur la queue 'hello'
    async handleMessage(@Payload() data: any, @Ctx() context: RmqContext) {
        const channel = context.getChannelRef(); // Récupérer le canal
        const originalMsg = context.getMessage(); // Récupérer le message original

        try {
            console.log(' [x] Received %s', data.toString());
            // Ajoutez ici votre logique pour envoyer des e-mails
            console.log('MAIL ENVOYÉ');

            // Accuser réception du message
            channel.ack(originalMsg);
        } catch (error) {
            console.error('Error processing message:', error);
            // En cas d'erreur, vous pouvez gérer le message ici, par exemple, le renvoyer à la queue ou l'enregistrer pour un traitement ultérieur
            channel.nack(originalMsg); // Non accusé réception en cas d'erreur
        }
    }
}
