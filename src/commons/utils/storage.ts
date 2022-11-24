import { UserDataType } from "../../types/user";
import { NETWORKS } from "./constants";

export const STORAGE_KEYS = {
  THEME: "dark",
  USER_INFO: "user_info",
  NETWORK: "network",
};

export default class StorageUtils {
  static getItem(key: string, defaultValue: string): string {
    return localStorage.getItem(key) ?? defaultValue;
  }
  static getUserData(): UserDataType | null {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.USER_INFO) as string;
      return JSON.parse(data) as UserDataType;
    } catch {
      return null;
    }
  }

  static setUserData(payload: UserDataType) {
    localStorage.setItem(STORAGE_KEYS.USER_INFO, JSON.stringify(payload));
  }

  static updateUserData(payload: Partial<UserDataType>): UserDataType | null {
    const oldData: UserDataType | null = this.getUserData();
    if (oldData) {
      const newData: UserDataType = { ...oldData, ...payload };
      localStorage.setItem(STORAGE_KEYS.USER_INFO, JSON.stringify(newData));
      return newData;
    }
    return null;
  }
  static getNetwork(): keyof typeof NETWORKS {
    return localStorage.getItem(STORAGE_KEYS.NETWORK) as keyof typeof NETWORKS  ?? "mainnet";
  }

  static clear() {
    localStorage.removeItem(STORAGE_KEYS.USER_INFO);
  }
}
