import { Module, Global } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import Redis from 'ioredis';
import { RedisService } from './redis.service';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: 'REDIS_CLIENT',
      useFactory: async (configService: ConfigService) => {
        const redisClient = new Redis({
          db: configService.get<number>('REDIS_DB', 0), // Define um valor padrão para o banco de dados
          username: configService.get<string>('REDIS_USERNAME', ''), // Use um valor padrão caso não tenha
          password: configService.get<string>('REDIS_PASSWORD', ''), // Certifique-se de que a senha é obrigatória se necessário
          host: configService.get<string>('REDIS_HOST', 'localhost'),
          port: configService.get<number>('REDIS_PORT', 6379),
        });

        // Opcional: adicione tratamento de erro para conexão
        redisClient.on('error', (err) => {
          console.error('Redis Client Error', err);
        });

        return redisClient;
      },
      inject: [ConfigService],
    },
    RedisService,
  ],
  exports: [
    'REDIS_CLIENT', 
    RedisService,   
  ],
})
export class RedisModule {}
