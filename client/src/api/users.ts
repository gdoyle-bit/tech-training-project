import type { CurrentUser } from "../types/user";

const API_URL = import.meta.env.VITE_API_URL;

export async function getCurrentUser(
  token: string,
): Promise<CurrentUser> {
  const response = await fetch(`${API_URL}/api/users/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error("Not authenticated.");
    }

    throw new Error("Failed to fetch current user.");
  }

  return response.json();
}