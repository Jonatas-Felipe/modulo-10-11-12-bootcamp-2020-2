import AppError from '@shared/errors/AppError';

import FakeCacheProvider from '@shared/container/provider/CacheProvider/fakes/FakeCacheProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import CreateUserService from './CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let fakeCacheProvider: FakeCacheProvider;
let createUserService: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeCacheProvider = new FakeCacheProvider();
    createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
      fakeCacheProvider,
    );
  });

  it('Should be able to create a new user', async () => {
    const user = await createUserService.execute({
      name: 'Jonatas Felipe',
      email: 'jonatas@amzmp.com',
      password: '123456',
    });
    expect(user).toHaveProperty('id');
  });

  it('Should not be able to create a new user with same email from another', async () => {
    await createUserService.execute({
      name: 'Jonatas Felipe',
      email: 'jonatas@amzmp.com',
      password: '123456',
    });

    await expect(
      createUserService.execute({
        name: 'Jonatas Felipe',
        email: 'jonatas@amzmp.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
