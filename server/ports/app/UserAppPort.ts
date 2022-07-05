export interface UpdateUserPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export default interface UserAppPort {
  fetchUsers: <T = {}>(option: any) => T[];
  fetchUser: <T = {}>(id: string) => T;
  updateUser: <T = {}>(id: string, payload: UpdateUserPayload) => T;
  deleteUser: (id: string) => boolean;
}
