// age calculator ignores leap years
// Select input fields (day, month and year) and calculateAgeBtn
var dayOfBirthInput = document.querySelector("#inputDay");
var monthOfBirthInput = document.querySelector("#inputMonth");
var yearOfBirthInput = document.querySelector("#inputYear");
var calculateAgeBtn = document.querySelector("#calculateAgeBtn");
// Select error message tags
var dayOfBirthError = document.querySelector("#inputDayError");
var monthOfBirthError = document.querySelector("#inputMonthError");
var yearOfBirthError = document.querySelector("#inputYearError");
// Select result fields
var noOfYears = document.querySelector("#yearsResult");
var noOfMonths = document.querySelector("#monthResult");
var noOfDays = document.querySelector("#daysResult");
// error messages
var emptyFieldError = "This field is required";
var invalidMonth = "Must be a valid month";
var invalidDay = "Must be a valid day";
var invalidYear = "Must be in the past";
var invalidDate = "Must be a valid date";
function focusNext(currentInput, nextInput, length) {
    if (length === void 0) { length = 0; }
    if (currentInput.value.trim().length >= length) {
        nextInput.focus();
        nextInput.setSelectionRange(0, nextInput.value.trim().length);
        return true;
    }
    return false;
}
dayOfBirthInput.addEventListener("input", function () { return focusNext(dayOfBirthInput, monthOfBirthInput, 2); });
monthOfBirthInput.addEventListener("input", function () { return focusNext(monthOfBirthInput, yearOfBirthInput, 2); });
yearOfBirthInput.addEventListener("input", function () {
    if (yearOfBirthInput.value.trim().length == 4) {
        calculateAgeBtn.focus();
        return true;
    }
    return false;
});
function isNumericInput(event) {
    var key = event.key;
    var allowedKeys = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "Delete", "ArrowLeft", "ArrowRight", "Backspace", "Tab"];
    if (allowedKeys.indexOf(key) === -1) {
        event.preventDefault(); // prevent keyboard input
        return false;
    }
    return true;
}
dayOfBirthInput.addEventListener("keydown", function (event) { return isNumericInput(event); });
monthOfBirthInput.addEventListener("keydown", function (event) { return isNumericInput(event); });
yearOfBirthInput.addEventListener("keydown", function (event) { return isNumericInput(event); });
function isValidForm() {
    var daysPerMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; // age calculator ignores leap years
    var isValid = true;
    // "Must be a valid month" message
    if (Number(monthOfBirthInput.value) >= 13 || Number(monthOfBirthInput.value) <= -1) {
        isValid = false;
        monthOfBirthError.textContent = invalidMonth;
    }
    else {
        monthOfBirthError.textContent = "";
    }
    // "Must be a valid day" message
    var day = Number(dayOfBirthInput.value);
    var maxDay = daysPerMonth[Number(monthOfBirthInput.value) - 1]; // Subtract 1 to get the correct index
    if (day <= 0 || day >= maxDay + 1 || day >= 32) {
        isValid = false;
        dayOfBirthError.textContent = invalidDay;
    }
    else {
        dayOfBirthError.textContent = "";
    }
    // "Must be in the past" message
    if (new Date(Number(yearOfBirthInput.value), Number(monthOfBirthInput.value), Number(dayOfBirthInput.value)).getTime() > new Date().getTime()) {
        isValid = false;
        yearOfBirthError.textContent = invalidYear;
    }
    else {
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
function calculateAge() {
    var today = new Date();
    var birthday = new Date(Number(yearOfBirthInput.value), parseInt(monthOfBirthInput.value, 10) - 1, parseInt(dayOfBirthInput.value, 10));
    var ageInYears = today.getFullYear() - birthday.getFullYear();
    var ageInMonth = today.getMonth() - birthday.getMonth();
    var ageInDays = today.getDate() - birthday.getDate();
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
        var lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 0);
        ageInDays += lastMonth.getDate();
    }
    return { years: ageInYears, months: ageInMonth, days: ageInDays };
}
function displayAge() {
    noOfYears.textContent = calculateAge().years.toString();
    noOfMonths.textContent = calculateAge().months.toString();
    noOfDays.textContent = calculateAge().days.toString();
}
calculateAgeBtn.addEventListener("click", function () {
    dayOfBirthInput.focus();
    dayOfBirthInput.setSelectionRange(0, dayOfBirthInput.value.trim().length);
    if (isValidForm()) {
        displayAge();
    }
});
