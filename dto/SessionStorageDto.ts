import { UserDto } from "./UserDto";

export type SessionStorageDto = {
  user: UserDto;
  token: string;
};
