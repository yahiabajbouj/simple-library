import {
    registerDecorator,
    ValidationArguments,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
  } from 'class-validator';
import { differenceInDays } from 'date-fns';
  
  @ValidatorConstraint({ async: false })
  export class IsPeriodValidConstraint implements ValidatorConstraintInterface {
    validate(endDate: any, args: ValidationArguments) {
      const [relatedPropertyName] = args.constraints;
      const startDate = (args.object as any)[relatedPropertyName];
  
      if (!startDate || !endDate) {
        return false;
      }

      const diffDays = differenceInDays(new Date(endDate), new Date(startDate));
      return diffDays <= 30;
    }
  
    defaultMessage(args: ValidationArguments) {
      const [relatedPropertyName] = args.constraints;
      return `${relatedPropertyName} must be earlier than ${args.property}`;
    }
  }
  
  export function IsPeriodValid(
    property: string,
    validationOptions?: ValidationOptions,
  ) {
    return function (object: Object, propertyName: string) {
      registerDecorator({
        target: object.constructor,
        propertyName: propertyName,
        options: validationOptions,
        constraints: [property],
        validator: IsPeriodValidConstraint,
      });
    };
  }
  