interface Validatable {
    value: string | number;
    required?: boolean;
    maxLength?: number;
    minLength?: number;
}

export function validate(obj:Validatable){
    let isValid = true
    if(obj.required){
        isValid = isValid && obj.value.toString().trim().length > 0
    }

    if(obj.maxLength){
        isValid = isValid && obj.value.toString().trim().length < obj.maxLength
    }

    if(obj.minLength){
        isValid = isValid && obj.value.toString().trim().length > obj.minLength
    }

    return isValid

}
