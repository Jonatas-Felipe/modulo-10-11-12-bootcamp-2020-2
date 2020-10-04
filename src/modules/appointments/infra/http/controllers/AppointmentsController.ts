import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateAppointmentsService from '@modules/appointments/services/CreateAppointmentService';
import ListAppointmentsService from '@modules/appointments/services/ListAppointmentsService';

class AppointmentsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listAppointmentsService = container.resolve(ListAppointmentsService);
    const appointments = await listAppointmentsService.execute();
    return response.json(appointments);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { provider_id, date } = request.body;

    const createAppointments = container.resolve(CreateAppointmentsService);

    const appointment = await createAppointments.execute({
      user_id,
      provider_id,
      date,
    });

    return response.json(appointment);
  }
}

export default new AppointmentsController();
