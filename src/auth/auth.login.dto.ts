import { IsNotEmpty, Length } from 'class-validator';
export class AuthLoginDto {
  @IsNotEmpty()
  @Length(6, 20)
  readonly username: string;
  @IsNotEmpty()
  @Length(8, 50)
  readonly password: string;
}
