import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { JwtModule, JwtService } from "@nestjs/jwt";
import { UserRepository } from "./repositories/user.repository";
import { PassportModule } from "@nestjs/passport";
import { JwtStrategy } from "./jwt.strategy";
import { GqlExecutionContext } from "@nestjs/graphql";
import { AuthCredentialsInput } from "./dto/auth-credentials.input";

const mockUserRepository = () => ( {
  register: jest.fn(),
} )

describe( 'UsersService', () =>
{
  let userService: UsersService;
  let userRepository;

  beforeEach( async () =>
  {

    const module: TestingModule = await Test.createTestingModule( {
      imports: [
        PassportModule.register( { defaultStrategy: 'jwt' } ),
        JwtModule.register( {
          secret: "secretkey123@#",
          signOptions: {
            expiresIn: 360000,
          },
        } ),
      ],
      providers: [
        UsersService,
        {
          provide: UserRepository, useFactory: mockUserRepository
        },
        GqlExecutionContext,
        JwtStrategy
      ],
    } ).compile();

    userService = await module.get<UsersService>( UsersService );
    userRepository = await module.get<UserRepository>( UserRepository );
  } );

  describe( 'userService', () =>
  {

    it( 'should be toBeDefined', () =>
    {
      expect( userService ).toBeDefined();
    } );

   
  } );
} );
