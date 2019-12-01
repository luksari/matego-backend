import { ApiModelProperty } from '@nestjs/swagger';

export class AuthResponse {
  constructor(user_id: number, user_role: string, access_token: string) {
    this.user_id = user_id;
    this.user_role = user_role;
    this.access_token = access_token;
  }
  @ApiModelProperty()
  readonly user_id: number;
  @ApiModelProperty()
  readonly user_role: string;
  @ApiModelProperty()
  readonly access_token: string;
}
