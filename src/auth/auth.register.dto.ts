import { IsNotEmpty, Length, IsEmail } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class AuthRegisterDto {
  @ApiModelProperty()
  @IsNotEmpty()
  @Length(6, 20)
  readonly username: string;
  @ApiModelProperty()
  @IsNotEmpty()
  @Length(8, 50)
  readonly password: string;
  @ApiModelProperty()
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;
}
