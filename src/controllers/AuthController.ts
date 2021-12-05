import { Controller, Post, Res, JsonController, Body, Get, UploadedFile } from 'routing-controllers';
import { Response } from 'express';
import Container from 'typedi';
import { AuthService } from '../services/AuthService';
import IUser from '../interfaces/IUser';
import { fileUploadOptions } from '../helpers/upload';

@Controller('/Auth')
@JsonController()
export class AuthController {
    private service: AuthService;
    constructor() {
        this.service = Container.get(AuthService);
    }

    @Post('/register')
    public async register(@Body() user: IUser, @Res() res: Response): Promise<Response> {
        console.log(user);
        const result = await this.service.register(user);
        return res.json(result);
    }

    @Post('/login')
    public async login(@Body() user: IUser, @Res() res: Response): Promise<Response> {
        const result = await this.service.login(user);
        return res.json(result);
    }

    @Post('/test')
    public async test(@Body() user: any, @Res() res: Response): Promise<any> {
        return res.send('');
    }

    @Post('/files')
    public saveFile(@UploadedFile('test', { options: fileUploadOptions }) file: any): any {
        console.log('files çalıştı');
    }
}
