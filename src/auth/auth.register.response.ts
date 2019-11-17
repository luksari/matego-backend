import { ApiModelProperty } from '@nestjs/swagger';

export class AuthRegisterResponse {
  @ApiModelProperty()
  id: number;
  @ApiModelProperty()
  username: string;
  @ApiModelProperty()
  email: string;
}
