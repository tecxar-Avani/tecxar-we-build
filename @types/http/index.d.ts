
interface NextPageContextRequest {
  req?: {
    isAuthenticated(): boolean
    user: ICurrentUser
    originalUrl: string
    session: {
      dbUser: ICurrentUser
      reload: () => void;
      user: ICurrentUser;
    };
  }
  res?: {
    redirect: (arg: string) => void
  }
}
