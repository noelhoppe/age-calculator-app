// age calculator ignores leap years

// Select input fields (day, month and year) and calculateAgeBtn
const dayOfBirthInput : HTMLInputElement = document.querySelector<HTMLInputElement>("#inputDay");
const monthOfBirthInput : HTMLInputElement = document.querySelector<HTMLInputElement>("#inputMonth");
const yearOfBirthInput : HTMLInputElement = document.querySelector<HTMLInputElement>("#inputYear");
const calculateAgeBtn : HTMLButtonElement = document.querySelector<HTMLButtonElement>("#calculateAgeBtn");

// Select error message tags
const dayOfBirthError : HTMLSpanElement = document.querySelector<HTMLSpanElement>("#inputDayError");
const monthOfBirthError : HTMLSpanElement = document.querySelector<HTMLSpanElement>("#inputMonthError");
const yearOfBirthError : HTMLSpanElement = document.querySelector<HTMLSpanElement>("#inputYearError");

// Select result fields
const noOfYears : HTMLSpanElement = document.querySelector<HTMLSpanElement>("#yearsResult");
const noOfMonths : HTMLSpanElement = document.querySelector<HTMLSpanElement>("#monthResult");
const noOfDays : HTMLSpanElement = document.querySelector<HTMLSpanElement>("#daysResult");

// error messages
const emptyFieldError : string = "This field is required";
const invalidMonth : string = "Must be a valid month";
const invalidDay : string = "Must be a valid day";
const invalidYear : string = "Must be in the past";
const invalidDate : string = "Must be a valid date";

// Split Age in years, months and days
type Age = {
    years : number,
    months : number,
    days : number
}

function focusNext(currentInput : HTMLInputElement, nextInput : HTMLInputElement, length : number = 0): boolean {
    if (currentInput.value.trim().length >= length) {
        nextInput.focus();
        nextInput.setSelectionRange(0, nextInput.value.trim().length);
        return true;
    }
    return false;
}
dayOfBirthInput.addEventListener("input", () : boolean => focusNext(dayOfBirthInput, monthOfBirthInput, 2));
monthOfBirthInput.addEventListener("input", () : boolean => focusNext(monthOfBirthInput, yearOfBirthInput , 2));
yearOfBirthInput.addEventListener("input", () : boolean => {
    if (yearOfBirthInput.value.trim().length == 4) {
        calculateAgeBtn.focus();
        return true;
    }
    return false;
})

function isNumericInput(event: KeyboardEvent): boolean {
    const key: string = event.key;
    const allowedKeys: string[] = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "Delete", "ArrowLeft", "ArrowRight", "Backspace", "Tab"];
    if (allowedKeys.indexOf(key) === -1) {
        event.preventDefault(); // prevent keyboard input
        return false;
    }
    return true;
}
dayOfBirthInput.addEventListener("keydown", (event : KeyboardEvent) : boolean => isNumericInput(event));
monthOfBirthInput.addEventListener("keydown", (event : KeyboardEvent) : boolean => isNumericInput(event));
yearOfBirthInput.addEventListener("keydown", (event : KeyboardEvent) : boolean => isNumericInput(event));

function isValidForm() : boolean {
    const daysPerMonth : number[] = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; // age calculator ignores leap years
    let isValid : boolean = true;
    // "Must be a valid month" message
    if (Number(monthOfBirthInput.value) >= 13 || Number(monthOfBirthInput.value) <= -1) {
        isValid = false;
        monthOfBirthError.textContent = invalidMonth;
    } else {
        monthOfBirthError.textContent = "";
    }
    // "Must be a valid day" message
    const day : number = Number(dayOfBirthInput.value);
    const maxDay : number = daysPerMonth[Number(monthOfBirthInput.value) - 1]; // Subtract 1 to get the correct index
    if (day <= 0 || day >= maxDay + 1 || day >= 32) {
        isValid = false;
        dayOfBirthError.textContent = invalidDay;
    } else {
        dayOfBirthError.textContent = "";
    }
    // "Must be in the past" message
    if (new Date(
        Number(yearOfBirthInput.value),
        Number(monthOfBirthInput.value),
        Number(dayOfBirthInput.value)
    ).getTime() > new Date().getTime()) {
        isValid = false;
        yearOfBirthError.textContent = invalidYear;
    } else {
        yearOfBirthError.textContent = "";
    }
    if (Number(yearOfBirthInput.value) < new Date().getFullYear()) {
        yearOfBirthError.textContent = "";
    }
    // "This field is required" messages
    if (dayOfBirthInput.value.trim().length == 0) {
        isValid = false;
        dayOfBirthError.textContent = emptyFieldError;
    }
    if (monthOfBirthInput.value.trim().length == 0) {
        isValid = false;
        monthOfBirthError.textContent = emptyFieldError;
    }
    if (yearOfBirthInput.value.trim().length == 0) {
        isValid = false;
        yearOfBirthError.textContent = emptyFieldError;
    }
    return isValid;
}

function calculateAge() : Age {
    const today : Date = new Date();
    const birthday : Date = new Date(Number(yearOfBirthInput.value), parseInt(monthOfBirthInput.value, 10) - 1, parseInt(dayOfBirthInput.value, 10));

    let ageInYears : number = today.getFullYear() - birthday.getFullYear();
    let ageInMonth : number = today.getMonth() -  birthday.getMonth();
    let ageInDays : number = today.getDate() - birthday.getDate();

    /*
    birthday in this year?
    1. Current month is less than birthday month OR
    2. Current month is birthday month AND current day is less than birthday day
    */
    if (today.getMonth() < birthday.getMonth() || (today.getMonth() == birthday.getMonth() && today.getDate() < birthday.getDate())) {
        ageInYears--;
        ageInMonth += 12;
    }

    /*
    If ageInDays is negative, adjust ageInMonth and ageInYears
     */
    if (ageInDays <= -1) {
        ageInMonth--;
        const lastMonth : Date = new Date(today.getFullYear(), today.getMonth() - 1, 0);
        ageInDays += lastMonth.getDate();
    }

    return {years : ageInYears, months : ageInMonth, days : ageInDays};
}

function displayAge() {
    noOfYears.textContent = calculateAge().years.toString();
    noOfMonths.textContent = calculateAge().months.toString();
    noOfDays.textContent = calculateAge().days.toString();
}

calculateAgeBtn.addEventListener("click", () : void => {
    dayOfBirthInput.focus();
    dayOfBirthInput.setSelectionRange(0, dayOfBirthInput.value.trim().length);
    if (isValidForm()) {
        displayAge();
    }
})