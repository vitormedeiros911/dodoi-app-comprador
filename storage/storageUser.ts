import { UserDto } from "@/dto/UserDto";
import { USER_STORAGE } from "@/storage/storageConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function storageUserSave(user: UserDto) {
  await AsyncStorage.setItem(USER_STORAGE, JSON.stringify(user));
}

export async function storageUserGet(): Promise<UserDto | null> {
  const user = await AsyncStorage.getItem(USER_STORAGE);

  if (user) return JSON.parse(user) as UserDto;

  return null;
}
