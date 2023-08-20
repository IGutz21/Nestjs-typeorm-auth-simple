import { IsEmail, IsNumberString, IsString } from 'class-validator';
import { createZodDto } from 'nestjs-zod';
import { z, ZodString, ZodError } from 'nestjs-zod/z';

// export class CreateUserDto {
//   @IsString()
//   name: string;

//   @IsEmail()
//   email: string;

//   @IsNumberString()
//   phone: string;

// }

const UserZodSchema = z.object({
  username: z.string(),
  email: z.string().email('Email invalid'),
  password: z.password().min(6),
});



export class CreateUserDto extends createZodDto(UserZodSchema) {}
export class UpdateUserDto extends createZodDto(UserZodSchema) {}
