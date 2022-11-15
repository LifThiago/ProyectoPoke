export function validateString(string) {
    let check = /^[a-zA-Z\s]*$/;
    if(check.test(string)) {
      return true
    } else {
      return false
    }
  }
export function validateUrl(value) {
    return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(value);
  }

export function validateForm(input){
    let errors = {};
    if(validateString(input.name) !== true){
      errors.name = 'The name only accepts numbers'
    }
    if(!input.name) {
      errors.name = 'The pokemon must have a name'
    }
    if(input.hp.length === 0){
      errors.hp = 'HP must be greater than 0'
    } else if(input.hp > 999) {
      errors.hp = 'HP must be less than 1000'
    }
    if(input.attack.length === 0){
      errors.attack = 'Attack must be greater than 0'
    } else if(input.attack > 999){
      errors.attack = 'Attack must be less than 1000'
    }
    if(input.defense.length === 0){
      errors.defense = 'Defense must be greater than 0'
    } else if(input.defense > 999){
      errors.defense = 'Defense must be less than 1000'
    }
    if(input.speed.length === 0){
      errors.speed = 'Speed must be greater than 0'
    } else if(input.speed > 999){
      errors.speed = 'Speed must be less than 1000'
    }
    if(input.height.length === 0){
      errors.height = 'Height must be greater than 0'
    } else if(input.height > 25){
      errors.height = 'Height must be less than 25'
    }
    if(input.weight.length === 0){
      errors.weight = 'Weight must be greater than 0'
    } else if(input.weight > 5000){
      errors.weight = 'Weight must be less than 5000'
    }
    if(input.img.length === 0) {
      errors.img = 'You must enter an URL'
    } else if(validateUrl(input.img) !== true){
      errors.img = 'You must enter a valid image URL'
    }
    if(input.type.length === 0){
      errors.type = 'You must select at least 1 type'
    }
    return errors
  }

export function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}