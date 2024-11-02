import { Body, Controller, Get, Param, Post, Put, Render, Req, Res, UseGuards, UseInterceptors } from '@nestjs/common';
import { Response } from 'express';
import { PhoneService } from '../phone/phone.service';
import { CreatePhoneDto } from '../phone/dto/create-phone.dto';
import { AuthGuard } from '../auth/auth.guard';
import { TenantInterceptor } from '../tenant/middleware/tenant.interceptor';
import { AuthService } from '../auth/auth.service';
import { UpdatePhoneStatusDto } from '../phone/dto/update-status-phone.dto';
import { UpdatePhoneDto } from '../phone/dto/update-phone.dto';

@UseGuards(AuthGuard)
@UseInterceptors(TenantInterceptor)
@Controller('views/phone')
export class ViewsPhoneController {
    constructor(
        private readonly phoneService: PhoneService,
    ) { }


    @Get('/list')
    @Render('phone/list-phones')
    async loginPage() {
        const phones = await this.phoneService.findAll()
        return {phones};
    }
    
    @Get('/register')
    @Render('phone/add-phone')
    registerPage( @Req() req: any, @Res() res: Response) {
        if (!req.session.user?.token) {
            return res.redirect('/views/auth/login');
        }

        return {};
    }

    @Post('/register')
    async register(@Body() createPhoneDto: CreatePhoneDto, @Req() req: any, @Res() res: Response) {
        if (!req.session.user?.token) {
            return res.redirect('/views/auth/login');
        }
        try {
            await this.phoneService.create(createPhoneDto);
            return res.redirect('/views/phone/list');
        } catch (error) {
            return res.render('phone/list-phones', {
                error: 'Não foi possível criar o investimento. Verifique os dados e tente novamente.',
            });
        }
    }

    @Post('/stolen/:id')
    async markAsStolen(
        @Param('id') id: string,
        @Body() updatePhoneStatusDto: UpdatePhoneStatusDto,
        @Res() res: Response
    ){
        await this.phoneService.markAsStolen(id,updatePhoneStatusDto)
        return res.redirect('/views/phone/list')
    }

    @Get('/edit/:id/')
    @Render('phone/update-phone')
    async editContact(@Param('id') id: string) {
        const phone = await this.phoneService.findOne(id);
        return { phone };
    }

    @Post('/delete/:id')
    async deleteContact(@Param('id') id: string, @Res() res: Response) {
        await this.phoneService.remove(id);
        return res.redirect('/views/phone/list');
    }

    @Post('/edit/:id')
    async updateContact(
        @Param('id') id: string,
        @Body() updatePhoneDto: UpdatePhoneDto,
        @Res() res: Response
    ) {
        await this.phoneService.update(id, updatePhoneDto);
        return res.redirect('/views/phone/list');
    }

}
