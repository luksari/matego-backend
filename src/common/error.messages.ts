import { ApiModelProperty } from '@nestjs/swagger';

export class ErrorMessages {
  static UserNotFound = 'UserNotFound';
  static UserExists = 'UserExists';
  static WrongPassword = 'WrongPassword';
  static PasswordEmpty = 'PasswordEmpty';
  static PasswordWrongFormat = 'PasswordWrongFormat';
  static UsernameEmpty = 'UsernameEmpty';
  static UsernameWrongFormat = 'UsernameWrongFormat';
  static EmailEmpty = 'EmailEmpty';
  static EmailWrongFormat = 'EmailWrongFormat';
  static ManufacturerNotFound = 'ManufacturerNotFound';
  static TypeNotFound = 'TypeNotFound';
  static ProductNotFound = 'ProductNotFound';
}
