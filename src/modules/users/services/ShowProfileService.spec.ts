import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import ShowProfileService from './ShowProfileService';

let fakeUsersRepository: FakeUsersRepository;
let showProfileService: ShowProfileService;

describe('ShowProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    showProfileService = new ShowProfileService(fakeUsersRepository);
  });

  it('Should be able show the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Jonatas Felipe',
      email: 'jonatas@amzmp.com',
      password: '123456',
    });

    const profile = await showProfileService.execute({
      user_id: user.id,
    });

    expect(profile.name).toBe('Jonatas Felipe');
    expect(profile.email).toBe('jonatas@amzmp.com');
  });

  it('Should not be able show the profile from non-existing user', async () => {
    await expect(
      showProfileService.execute({
        user_id: 'non-exisitng-user-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
