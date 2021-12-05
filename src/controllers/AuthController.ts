import { Controller, Post, Res, JsonController, Body, UploadedFile } from 'routing-controllers';
import { Response } from 'express';
import Container from 'typedi';
import { AuthService } from '../services/AuthService';
import IUser from '../interfaces/IUser';
import { upload } from '../helpers/upload';
import { ApiResult } from './ApiResult';

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
        console.log('user', user);
    }

    @Post('/file')
    public saveFile(@UploadedFile('test', { options: upload }) file: any, @Res() res: Response): any {
        return res.json(new ApiResult({}));
    }

    @Post('/files')
    public saveFiles(@UploadedFile('testfiles', { options: upload }) file: any, @Res() res: Response): any {
        return res.json(new ApiResult({}));
    }
}
