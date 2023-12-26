"use strict";
// console.log(new Date(2003, 10, 6));
// console.log(-10);
document.addEventListener("DOMContentLoaded", () => {
    // Select Elements
    const dayIn = document.getElementById("day");
    const monthIn = document.getElementById("month");
    const yearIn = document.getElementById("year");
    const errorMessageDay = document.getElementById("message-day");
    const errorMessageMonth = document.getElementById("message-month");
    const errorMessageYear = document.getElementById("message-year");
    const calculateButton = document.getElementById("submit-button");
    const dayOut = document.getElementById("day-output");
    const monthOut = document.getElementById("month-output");
    const yearOut = document.getElementById("year-output");
    calculateButton.addEventListener("click", () => {
        const D = dayIn.valueAsNumber;
        const M = monthIn.valueAsNumber;
        const Y = yearIn.valueAsNumber;
        const birthday = `${Y}-${M}-${D}`;
        console.log(birthday);
        let years = new Date().getFullYear() - new Date(Y, M, D).getFullYear();
        let months = new Date().getMonth() - new Date(Y, M, D).getMonth();
        let days = new Date().getDate() - new Date(Y, M, D).getDate();
        if (months <= -1) {
            years--;
            months += 12;
        }
        if (days <= -1) {
            days += getNumberOfDays(Y, M - 1);
        }
        // Calculates the number of days of each month
        function getNumberOfDays(year, month) {
            return new Date(year, month, 0).getDate();
        }
        /*        console.log(years);
                console.log(months);
                console.log(days);*/
        if (isValidInput()) {
            dayOut.innerText = days.toString();
            monthOut.innerText = months.toString();
            yearOut.innerText = years.toString();
        }
        function isValidInput() {
            const fieldIsRequired = "This field is required.";
            const invalidDay = "Must be a valid day.";
            const invalidMonth = "Must be a valid month.";
            const invalidYear = "Must be in the past.";
            const dayLabel = document.getElementById("day-label");
            const monthLabel = document.getElementById("month-label");
            const yearLabel = document.getElementById("year-label");
            if (isNaN(D) || isNaN(M) || isNaN(Y)) {
                errorMessageDay.textContent = fieldIsRequired;
                errorMessageMonth.textContent = fieldIsRequired;
                errorMessageYear.textContent = fieldIsRequired;
                dayLabel.classList.add("error-message");
                monthLabel.classList.add("error-message");
                yearLabel.classList.add("error-message");
                dayIn.classList.add("input-errorState");
                monthIn.classList.add("input-errorState");
                yearIn.classList.add("input-errorState");
                return false;
            }
            if (dayIn.value.length != 2 || dayIn.valueAsNumber <= 0 || dayIn.valueAsNumber >= getNumberOfDays(yearIn.valueAsNumber, monthIn.valueAsNumber) + 1) {
                errorMessageDay.textContent = invalidDay;
                dayLabel.classList.add("error-message");
                dayIn.classList.add("input-errorState");
                return false;
            }
            if (monthIn.value.length != 2 || monthIn.valueAsNumber <= -1 || monthIn.valueAsNumber >= 13) {
                errorMessageMonth.textContent = invalidMonth;
                monthLabel.classList.add("error-message");
                monthIn.classList.add("input-errorState");
                return false;
            }
            if (yearIn.valueAsNumber >= new Date().getFullYear() + 1) {
                errorMessageYear.textContent = invalidYear;
                yearLabel.classList.add("error-message");
                yearIn.classList.add("input-errorState");
                return false;
            }
            errorMessageDay.textContent = "";
            errorMessageMonth.textContent = "";
            errorMessageYear.textContent = "";
            dayLabel.classList.remove("error-message");
            monthLabel.classList.remove("error-message");
            yearLabel.classList.remove("error-message");
            dayIn.classList.remove("input-errorState");
            monthIn.classList.remove("input-errorState");
            yearIn.classList.remove("input-errorState");
            return true;
        }
    });
});
