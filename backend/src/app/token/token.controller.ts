import { Controller, Body, Put, HttpException } from '@nestjs/common';
import { TokenEntity } from './entities/token.entity';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { LoginReturn } from './dto/return-token.dto';
import { TokenService } from './token.service';

@Controller('/token')
export class TokenController {
  constructor(
    private readonly tokenService: TokenService
  ) { }

  @Put('refresh')
  async refreshToken(@Body() data: RefreshTokenDto): Promise<LoginReturn | HttpException> {
    return this.tokenService.refreshToken(data.oldToken);
  }
}
