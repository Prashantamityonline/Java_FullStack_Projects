import passwordValidator from "password-validator"
var schema = new passwordValidator();

schema
    .is().min(8)                                    // Minimum length 8
    .is().max(100)                                  // Maximum length 100
    .has().uppercase(1)                              // Must have 1 uppercase letter
    .has().lowercase(1)                              // Must have 1 lowercase letter
    .has().digits(1)                                // Must have 1 digit
    .has().not().spaces()                           // Should not have spaces
    .is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist these values


export default function formValidators(e) {
    let { name, value } = e.target
    switch (name) {
        case 'name':
        case 'username':
        case 'color':
            if (!value && value.length === 0)
                return name + " Field is Mendatory"
            else if (value.length < 3 || value.length > 50)
                return name + " Field Length must be within 3-50 characters"
            else
                return ""

        case 'email':
            if (!value && value.length === 0)
                return name + " Field is Mendatory"
            else if (value.length < 13 || value.length > 100)
                return name + " Field Length must be within 13-100 characters"
            else
                return ""

        case 'subject':
            if (!value && value.length === 0)
                return name + " Field is Mendatory"
            else if (value.length < 10 || value.length > 200)
                return name + " Field Length must be within 10-200 characters"
            else
                return ""

        case 'password':
            if (!value && value.length === 0)
                return name + " Field is Mendatory"
            else if (!schema.validate(value))
                return "Invalid Password! Its Length must be within 8-100 characters, Must Contains atleast 1 Upper Case Character,1 lower Case Character and 1 Digit and It Should not contains any space"
            else
                return ""

        case 'phone':
            if (!value && value.length === 0)
                return name + " Field is Mendatory"
            else if (value.length !== 10)
                return name + " Field Length must be 10"
            else if (!(value.startsWith("6") || value.startsWith("7") || value.startsWith("8") || value.startsWith("9")))
                return "Invalid Phone NUmber"
            else
                return ""


        case 'size':
            if (!value && value.length === 0)
                return name + " Field is Mendatory"
            else if (value.length > 50)
                return name + " Field Length must be less than 50 characters"
            else
                return ""


        case 'basePrice':
            if (!value && value.length === 0)
                return name + " Field is Mendatory"
            else if (parseInt(value) < 1)
                return "Price Must be a Value Greater then 0"
            else
                return ""

        case 'discount':
            if (!value && value.length === 0)
                return name + " Field is Mendatory"
            else if (parseInt(value) < 0 || parseInt(value) > 100)
                return "Discount Field Must Be 0-100"
            else
                return ""

        case 'stockQuantity':
            if (!value && value.length === 0)
                return name + " Field is Mendatory"
            else if (parseInt(value) < 0)
                return "Price Must be a Positive Value"
            else
                return ""

        case 'message':
            if (!value && value.length === 0)
                return name + " Field is Mendatory"
            else if (value.length < 50 || value.length > 2000)
                return name + " Field Length must be within 50-2000 characters"
            else
                return ""
        default:
            return ""
    }
}