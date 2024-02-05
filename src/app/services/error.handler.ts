import {FormGroup} from "@angular/forms";



/**
 * error dictionary to match the errors from the formControl
 */
const errors: any = {
  required: () => "Ce champ est requis",
  requiredTrue: () => "Ce champ est requis",
  min: (error: any) => `Le minimum est ${error.min}`,
  max: (error: any) => `Le maximum est ${error.max}`,
  email: () => "Veuillez entrer un mail valide",
  minlength: (error: any) => `Longueur minimum: ${error.requiredLength}`,
  maxlength: (error: any) => `Longueur maximum: ${error.requiredLength}`,
  pattern: () => "Entrer une valeur valide"
};


/**
 * this function evaluates the error from a formControl and gives the appropriate error message
 * @param form
 * @param key
 * @param details
 */
export const evaluateError = (form: FormGroup, key: string, details: { [key: string]: any } = {}) => {
  let err = form.get(key)?.errors;
  if (err) {
    let errorKey: string = (Object.keys(err)[0]);
    let errorObject = details[errorKey];
    if (!errorObject) {
      errorObject = errors[errorKey];
    }
    return errorObject(err[errorKey]);
  }
  return "";
}

