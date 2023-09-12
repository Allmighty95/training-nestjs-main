import { User } from '../../user/entities/user.entity';

export const userSeed: Partial<User>[] = [
  {
    id: undefined,
    email: 'admin@inkoms.org',
    firstName: 'Admin',
    secondName: undefined,
    firstLastName: 'Inkoms',
    secondLastName: 'Admin',
    password: 'Teardrop7777',
    loginCount: 0,
    company: `Inkoms`,
    createdAt: undefined,
    updatedAt: undefined,
  },
];
