import { SessionStorageDto } from "@/dto/SessionStorageDto";
import { UserDto } from "@/dto/UserDto";
import { USER_STORAGE } from "@/storage/storageConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function storageUserSave(
  user: UserDto,
  token: string
): Promise<void> {
  await AsyncStorage.setItem(USER_STORAGE, JSON.stringify({ user, token }));
}

export async function storageUserGet(): Promise<SessionStorageDto | null> {
  const user = await AsyncStorage.getItem(USER_STORAGE);

  if (user) return JSON.parse(user);

  return null;
}
