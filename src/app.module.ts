import { Module } from '@nestjs/common';
import { UserModule } from './app/user/user.module';
import { PhoneModule } from './app/phone/phone.module';
import { ViewsModule } from './app/views/views.module';
import { DbModule } from './app/db/db.module';
import { ConfigModule } from '@nestjs/config';
import { TenantService } from './app/tenant/tenant.service';
import { TenantModule } from './app/tenant/tenant.module';
import { AuthModule } from './app/auth/auth.module';
import { RedisModule } from './app/redis/redis.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UserModule, PhoneModule, DbModule, ViewsModule, TenantModule, AuthModule, RedisModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
