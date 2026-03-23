import { User } from "../data/mockData";

export type AuthUser = User & { password: string };

const USERS_STORAGE_KEY = "cozystay:users";
const SESSION_STORAGE_KEY = "cozystay:session";

const DEFAULT_USER: AuthUser = {
  id: "user1",
  name: "John Doe",
  email: "john.doe@email.com",
  phone: "+1 234 567 8900",
  address: "123 Main Street, New York, NY 10001",
  password: "password123",
};

function readUsers(): AuthUser[] {
  if (typeof window === "undefined") return [DEFAULT_USER];

  try {
    const raw = localStorage.getItem(USERS_STORAGE_KEY);
    if (!raw) return [DEFAULT_USER];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [DEFAULT_USER];
    return parsed;
  } catch {
    return [DEFAULT_USER];
  }
}

function writeUsers(users: AuthUser[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  } catch {
    // ignore quota errors
  }
}

export function registerUser(newUser: AuthUser): { success: true } | { success: false; error: string } {
  const users = readUsers();
  const exists = users.some((u) => u.id.toLowerCase() === newUser.id.toLowerCase());
  if (exists) {
    return { success: false, error: "A user with that User ID already exists." };
  }

  const next = [...users, newUser];
  writeUsers(next);
  return { success: true };
}

export function authenticateUser(
  userId: string,
  password: string,
): { success: true; user: User } | { success: false; error: string } {
  const users = readUsers();
  const user = users.find((u) => u.id.toLowerCase() === userId.toLowerCase());
  if (!user) {
    return { success: false, error: "No account found for that User ID." };
  }

  if (user.password !== password) {
    return { success: false, error: "Incorrect password." };
  }

  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(SESSION_STORAGE_KEY, user.id);
    } catch {
      // ignore
    }
  }

  const { password: _p, ...rest } = user;
  return { success: true, user: rest };
}

export function getPasswordForUser(userId: string): { success: true; password: string } | { success: false; error: string } {
  const users = readUsers();
  const user = users.find((u) => u.id.toLowerCase() === userId.toLowerCase());
  if (!user) {
    return { success: false, error: "No account found for that User ID." };
  }

  return { success: true, password: user.password };
}

export function getCurrentUser(): User | null {
  if (typeof window === "undefined") return null;
  try {
    const session = localStorage.getItem(SESSION_STORAGE_KEY);
    if (!session) return null;

    const users = readUsers();
    const user = users.find((u) => u.id === session);
    if (!user) return null;

    const { password: _p, ...rest } = user;
    return rest;
  } catch {
    return null;
  }
}

export function isAuthenticated() {
  return Boolean(getCurrentUser());
}

export function logout() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(SESSION_STORAGE_KEY);
}

export function updateUser(updated: User): boolean {
  const users = readUsers();
  const idx = users.findIndex((u) => u.id === updated.id);
  if (idx === -1) return false;

  users[idx] = {
    ...users[idx],
    ...updated,
  };

  writeUsers(users);
  return true;
}
