export interface CurrentUser {
    UserId: number;
    ClerkId: string;
    UserName: string | null;
    Email: string;
    FirstName: string | null;
    LastName: string | null;
    IsAnonymous: boolean;
    LastActivityAt: string;
}