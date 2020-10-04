import AppError from '@shared/errors/AppError';

import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateProfileService from './UpdateProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfileService: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    updateProfileService = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('Should be able update the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Jonatas Felipe',
      email: 'jonatas@amzmp.com',
      password: '123456',
    });

    const updatedUser = await updateProfileService.execute({
      user_id: user.id,
      name: 'Jonatas Felipe Fernandes de Campos',
      email: 'jonatas@wodo.com',
    });

    expect(updatedUser.name).toBe('Jonatas Felipe Fernandes de Campos');
    expect(updatedUser.email).toBe('jonatas@wodo.com');
  });

  it('Should not be able show the profile from non-existing user', async () => {
    await expect(
      updateProfileService.execute({
        user_id: 'non-exisitng-user-id',
        name: 'Jonatas Felipe',
        email: 'jonatas@amzmp.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to change to another user email', async () => {
    await fakeUsersRepository.create({
      name: 'Jonatas Felipe',
      email: 'jonatas@amzmp.com',
      password: '123456',
    });

    const user = await fakeUsersRepository.create({
      name: 'Teste Update',
      email: 'testeUpdate@amzmp.com',
      password: '123456',
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        name: 'Jonatas Felipe',
        email: 'jonatas@amzmp.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should be able update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Jonatas Felipe',
      email: 'jonatas@amzmp.com',
      password: '123456',
    });

    const updatedUser = await updateProfileService.execute({
      user_id: user.id,
      name: 'Jonatas Felipe Fernandes de Campos',
      email: 'jonatas@wodo.com',
      old_password: '123456',
      password: '123123',
    });

    expect(updatedUser.password).toBe('123123');
  });

  it('Should not be able update the password without old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Jonatas Felipe',
      email: 'jonatas@amzmp.com',
      password: '123456',
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        name: 'Jonatas Felipe Fernandes de Campos',
        email: 'jonatas@wodo.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able update the password with wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Jonatas Felipe',
      email: 'jonatas@amzmp.com',
      password: '123456',
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        name: 'Jonatas Felipe Fernandes de Campos',
        email: 'jonatas@wodo.com',
        old_password: '123123',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
