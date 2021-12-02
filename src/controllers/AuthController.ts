import { Controller, Post, Res, JsonController, Body, Get } from 'routing-controllers';
import { Response } from 'express';
import Container from 'typedi';
import { AuthService } from '../services/AuthService';

@Controller('/auth')
@JsonController()
export class AuthController {
    constructor(private service: AuthService = Container.get(AuthService)) { }

    @Post('/auth/register')
    public async register(@Body() user: any, @Res() res: Response): Promise<Response> {
        const result = await this.service.register(user);
        return res.json(result);
    }

    @Get('/')
    public async login(@Body() user: any, @Res() res: Response): Promise<void> {
        console.log('asdlfkj');
    }

}
