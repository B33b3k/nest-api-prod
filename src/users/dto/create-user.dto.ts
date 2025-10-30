import { IsEmail, IsEnum, isEnum } from 'class-validator';

export class CreateUserDto {
  name: string;

  @IsEnum(['admin', 'user', 'guest'])
  role: 'admin' | 'user' | 'guest';

  // @IsEmail()
  // email: string;
}
