import { AbstractControl, ValidatorFn } from '@angular/forms';
import { isBlank, isPresent, isString } from '../../core/directives/my-input-number.directive';

/**
 * Faz validação se o valor é um número, e não permite que número seja negativo.
 */
export function validateNumberDefault(control: AbstractControl): { [key: string]: any } {
    let value = control.value;
    if (isBlank(value)) {
        return null;
    }

    if (isString(value)) {
        value = parseFloat(value);
    }

    if (isNaN(value)) {
        return {
            number: 'Não é um número válido'

        };
    }
    if (value < 0) {
        return {
            number: 'O valor não pode ser negativo'
        };
    }
    return null;
}

/**
 * Este método é um 'validator factory' e deve ser chamado passando os parametros de configuração.
 */
export function validateNumber(options:
    {
        acceptNegative?: boolean,
        onlyInteger?: boolean,
        greaterThan?: number,
        lessThan?: number
    } = {}): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
        let value = control.value;
        if (isBlank(value)) {
            return null;
        }

        if (isString(value)) {
            value = parseFloat(value);
        }

        if (isNaN(value)) {
            return {
                number: 'Não é um número válido'

            };
        }
        if (!options.acceptNegative && value < 0) {
            return {
                number: 'O valor não pode ser negativo'

            };
        }
        if (isPresent(options.greaterThan) && options.greaterThan >= value) {
            return {
                number: 'O valor tem que ser maior do que ' + options.greaterThan

            };
        }
        if (isPresent(options.lessThan) && options.lessThan <= value) {
            return {
                number: 'O valor tem que ser menor do que ' + options.lessThan

            };
        }
        if (options.onlyInteger && value !== 0) {
            const n = value < 0 ? (-1 * value) : value;

            if ((n % 1) !== 0) {
                return {
                    number: 'O valor tem que ser inteiro' // 'O valor não pode ser fracionado'
                };
            }
        }
        return null;

    };
}
