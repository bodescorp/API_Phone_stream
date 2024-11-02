import { Injectable } from '@nestjs/common';
import { UserDto } from '../user/dto/user.dto';

@Injectable()
export class TenantService {
    private tenant: UserDto

    setTenant(tenant:UserDto){
        this.tenant = tenant
    }

    getTenant(){
        return this.tenant
    }
}
