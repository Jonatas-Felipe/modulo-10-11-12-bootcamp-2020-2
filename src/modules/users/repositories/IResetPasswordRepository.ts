import User from '../infra/typeorm/entities/User';

export default interface IResetPasswordRepository {
  generate(id: string): Promise<User>;
}
