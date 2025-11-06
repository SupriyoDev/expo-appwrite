import { deleteItemAsync, getItem, setItem } from "expo-secure-store";
import { Account, Client, ID, Models } from "react-native-appwrite";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const client = new Client()
  .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!)
  .setPlatform(process.env.EXPO_PUBLIC_APPWRITE_PLATFORM_NAME!);

const account = new Account(client);

//all authentication functionality

export async function login(
  email: string,
  password: string,
  setUserAndLoggedIn: NonNullable<AuthStoreType["setUserAndLoggedIn"]>
) {
  try {
    await account.createEmailPasswordSession({ email, password });
    const user = await account.get();
    setUserAndLoggedIn(user);
    return null;
    //
  } catch (error) {
    if (error instanceof Error) return error.message;
    return "An error occurred during login!";
  }
}

export async function register(
  name: string,
  email: string,
  password: string,
  setUserAndLoggedIn: NonNullable<AuthStoreType["setUserAndLoggedIn"]>
) {
  try {
    await account.create({ email, password, name, userId: ID.unique() });
    await login(email, password, setUserAndLoggedIn);
    return null;
    //
  } catch (error) {
    if (error instanceof Error) return error.message;
    return "An error occurred during Signup!";
  }
}

export async function logoutCurrentDevice(logout: AuthStoreType["logout"]) {
  try {
    await account.deleteSession({ sessionId: "current" });
    logout();
    return null;
    //
  } catch (error) {
    if (error instanceof Error) return error.message;
    return "An error occurred during Logout!";
  }
}

export async function LogoutAllDevice(logout: AuthStoreType["logout"]) {
  try {
    await account.deleteSessions();
    logout();

    return null;
  } catch (error) {
    if (error instanceof Error) return error.message;
    return "Something went wrong!";
  }
}

// AUTH STORE ZUSTAND //

export type AuthStoreType = {
  user: Models.User<Models.Preferences> | null;
  isLoggedIn: boolean;
  setUserAndLoggedIn: (user: Models.User<Models.Preferences>) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthStoreType>()(
  persist(
    (set) => ({
      user: null,
      isLoggedIn: false,
      setUserAndLoggedIn: (user: Models.User<Models.Preferences>) =>
        set({ isLoggedIn: !!user.$id, user: user }),
      logout: () => set({ user: null, isLoggedIn: false }),
    }),
    {
      name: "Auth-store",
      storage: createJSONStorage(() => ({
        setItem,
        getItem,
        removeItem: deleteItemAsync,
      })),
    }
  )
);
