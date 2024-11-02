import { Global, Module } from '@nestjs/common';
import { TenantService } from './tenant.service';
import { TenantInterceptor } from './middleware/tenant.interceptor';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../user/entities/user.entity';
import { UserModule } from '../user/user.module';

@Global()
@Module({
    imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),UserModule],
    providers: [TenantService, TenantInterceptor],
    exports: [TenantService,TenantInterceptor]
})
export class TenantModule {}
