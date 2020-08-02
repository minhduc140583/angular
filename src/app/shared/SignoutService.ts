export interface SignoutService {
  signout(username: string): Promise<boolean>;
}
