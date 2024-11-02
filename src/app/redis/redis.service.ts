import { Injectable, Inject } from '@nestjs/common';
import * as Redis from 'ioredis';

@Injectable()
export class RedisService {
  constructor(
    @Inject('REDIS_CLIENT')
    private readonly redisClient: Redis.Redis,
  ) { }

  async publish(channel: string, message: any) {
    await this.redisClient.publish(channel, JSON.stringify(message));
  }

}
