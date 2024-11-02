import { Body, Controller, Get, Post, Render, Req, Res } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { UserService } from '../user/user.service';
import { CreateAuthDto } from '../auth/dto/create-auth.dto';
import { Response } from 'express';
import { CreateUserDto } from '../user/dto/create-user.dto';


@Controller('views/auth')
export class ViewsUserController {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService
    ) { }
    @Get('login')
    @Render('user/login') // Renderiza a view 'login.hbs'
    loginPage() {
        return {};
    }

    @Post('login')
    async login(
        @Body() data: CreateAuthDto,
        @Req() req: any,
        @Res() res: Response,) {
        try {
            const responseAuthDto = await this.authService.signIn(data);
            req.session.user = { token: responseAuthDto.token };
            return res.redirect('/views/phone/list');
        } catch (error) {
            return res.redirect('/views/auth/login');
        }
    }

    @Get('register')
    @Render('user/register')
    registerPage() {
        return {};
    }

    @Post('register')
    async register(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
        try {
            await this.userService.create(createUserDto);
            return res.redirect('/views/auth/login');
        } catch (error) {
            return res.render('create_user', {
                error: 'Não foi possível criar o usuário. Verifique os dados e tente novamente.',
            });
        }
    }
}
