export class ListUsersDto {
  readonly username?: string;
  readonly isActive?: boolean;
  readonly page: number;
  readonly size: number;
}
