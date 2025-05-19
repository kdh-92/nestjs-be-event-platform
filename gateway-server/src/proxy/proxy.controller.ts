import { Controller, All, Req, Res, UseGuards, Post } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { JwtAuthGuard } from '../auth/guards/auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Request, Response } from 'express';
import { lastValueFrom } from 'rxjs';
import { Public } from '../auth/decorators/public.decorator';

@Controller()
export class ProxyController {
  constructor(private readonly httpService: HttpService) {}

  @Public()
  @Post('/auth/login')
  async proxyLogin(@Req() req: Request, @Res() res: Response) {
    return this.forward(req, res, 'http://auth-server:3001');
  }

  @Public()
  @Post('/auth/signup')
  async proxySignup(@Req() req: Request, @Res() res: Response) {
    return this.forward(req, res, 'http://auth-server:3001');
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @All('*')
  async proxyAll(@Req() req: Request, @Res() res: Response) {
    const baseUrl = this.resolveBaseUrl(req.path);
    if (!baseUrl) return res.status(400).json({ message: 'Invalid route' });
    return this.forward(req, res, baseUrl);
  }

  private async forward(req: Request, res: Response, baseUrl: string) {
    const url = baseUrl + req.path.replace(/^\/[^/]+/, '');
    try {
      const response = await lastValueFrom(
        this.httpService.request({
          url,
          method: req.method as any,
          headers: req.headers,
          data: req.body,
          params: req.query,
        })
      );
      return res.status(response.status).send(response.data);
    } catch (e: any) {
      return res
        .status(e.response?.status || 500)
        .json(e.response?.data || { message: 'Proxy error' });
    }
  }

  private resolveBaseUrl(path: string): string | null {
    if (path.startsWith('/auth')) return 'http://auth-server:3001';
    if (path.startsWith('/events') || path.startsWith('/rewards'))
      return 'http://event-server:3002';
    return null;
  }
}
