import { IsNotEmpty, Length, IsEmail } from 'class-validator';

export class AuthRegisterDto {
  @IsNotEmpty()
  @Length(6, 20)
  readonly username: string;
  @IsNotEmpty()
  @Length(8, 50)
  readonly password: string;
  @IsNotEmpty()
  @IsEmail()
  readonly mail: string;
}
