import { ApiModelProperty } from '@nestjs/swagger';

export class AuthResponse {
  constructor(user_id: number, access_token: string) {
    this.user_id = user_id;
    this.access_token = access_token;
  }
  @ApiModelProperty()
  readonly user_id: number;
  @ApiModelProperty()
  readonly access_token: string;
}
