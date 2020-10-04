import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListAppointmentsService from './ListAppointmentsService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listAppointmentsService: ListAppointmentsService;

describe('ListAppointments', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listAppointmentsService = new ListAppointmentsService(
      fakeAppointmentsRepository,
    );
  });

  it('Should be able to list the appointments', async () => {
    const appointment1 = await fakeAppointmentsRepository.create({
      user_id: 'test',
      date: new Date(),
      provider_id: '123123',
    });

    const appointment2 = await fakeAppointmentsRepository.create({
      user_id: 'test',
      date: new Date(),
      provider_id: '123123',
    });

    const providers = await listAppointmentsService.execute();

    expect(providers).toEqual([appointment1, appointment2]);
  });
});
