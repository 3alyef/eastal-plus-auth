import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

// 1. Cria a classe que implementa a lógica de validação
@ValidatorConstraint({ async: false })
export class PasswordMatchConstraint implements ValidatorConstraintInterface {
  validate(repeatPassword: any, args: ValidationArguments) {
    const [relatedPropertyName] = args.constraints;
    const password = (args.object as any)[relatedPropertyName];
    return repeatPassword === password;
  }

  defaultMessage() {
    return 'Passwords do not match'; // Mensagem de erro personalizada
  }
}

// 2. Cria o decorador que será usado nos DTOs
export function PasswordMatches(
  property: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [property],
      validator: PasswordMatchConstraint,
    });
  };
}
