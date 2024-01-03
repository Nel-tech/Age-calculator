import React, { useState } from "react";

export default function App() {
  return (
    <div>
      <FormElement />
    </div>
  );
}

function Container({ children }) {
  return <div className="background-container">{children}</div>;
}

function calculateAge(birthDate) {
  const today = new Date();
  const dob = new Date(birthDate);

  let years = today.getFullYear() - dob.getFullYear();
  let months = today.getMonth() - dob.getMonth();
  let days = today.getDate() - dob.getDate();

  if (months < 0 || (months === 0 && today.getDate() < dob.getDate())) {
    years--;
    months = 12 - Math.abs(months);
  }

  if (days < 0) {
    months--;
    const previousMonth = new Date(
      today.getFullYear(),
      today.getMonth() - 1,
      0
    );
    days = previousMonth.getDate() - Math.abs(days);
  }

  return { years, months, days };
}

function FormElement() {
  const [Day, setDay] = useState("");
  const [Year, setYear] = useState("");
  const [Month, setMonth] = useState("");
  const [dayError, setDayError] = useState("");
  const [monthError, setMonthError] = useState("");
  const [yearError, setYearError] = useState("");
  const [age, setAge] = useState(null);

  function validateDayInMonth(day, month, year) {
    if (month === 2) {
      // February: Check for leap years
      if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
        return day >= 1 && day <= 29;
      } else {
        return day >= 1 && day <= 28;
      }
    } else if ([4, 6, 9, 11].includes(month)) {
      // April, June, September, November: 30 days
      return day >= 1 && day <= 30;
    } else {
      // January, March, May, July, August, October, December: 31 days
      return day >= 1 && day <= 31;
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    const currentYear = new Date().getFullYear();

    if (!dayError && !monthError && !yearError) {
      const ageResult = calculateAge(`${Year}-${Month}-${Day}`);
      setAge(ageResult);
    }

    if (Day === "") {
      setDayError("This field is required");
    } else if (!validateDayInMonth(Day, Month, Year)) {
      setDayError("Must be a valid day");
    } else {
      setDayError(""); // Resetting the error state if it's a valid day
    }

    if (Month === "") {
      setMonthError("This field is required");
    } else if (Month < 1 || Month > 12) {
      setMonthError("Must be a valid Month");
    } else {
      setMonthError("");
    }

    if (Year === "") {
      setYearError("This field is required");
    } else if (Year > currentYear) {
      setYearError("Must be in the past");
    } else {
      setYearError("");
    }
  }

  return (
    <div>
      <Container>
        <Formbackground
          Day={Day}
          Month={Month}
          Year={Year}
          setDay={setDay}
          setMonth={setMonth}
          setYear={setYear}
          handleSubmit={handleSubmit}
          dayError={dayError}
          monthError={monthError}
          yearError={yearError}
        />
        <LineButton onSubmit={handleSubmit} />
        <ContainerContent Day={Day} Month={Month} Year={Year} age={age} />
      </Container>
    </div>
  );
}

function Formbackground({
  Day,
  Month,
  Year,
  setDay,
  setMonth,
  setYear,
  handleSubmit,
  dayError,
  monthError,
  yearError,
}) {
  return (
    <div className="flex-container">
      <form onSubmit={handleSubmit}>
        <div
          className={`input-container ${
            dayError ? "error-border error-label" : ""
          }`}
        >
          <label className="label-el">DAY</label>
          <input
            type="number"
            value={Day}
            className="input-cont"
            placeholder="DD"
            onChange={(e) => setDay(e.target.value)}
          />
          <small className="error-el">{dayError}</small>
        </div>

        <div
          className={`input-container ${
            monthError ? "error-border error-label" : ""
          }`}
        >
          <label className="label-el">MONTH</label>
          <input
            type="number"
            value={Month}
            className="input-cont"
            placeholder="MM"
            onChange={(e) => setMonth(e.target.value)}
          />
          <small className="error-el">{monthError}</small>
        </div>

        <div
          className={`input-container ${
            yearError ? "error-border error-label" : ""
          }`}
        >
          <label className="label-el">YEAR</label>
          <input
            type="number"
            value={Year}
            className="input-cont"
            placeholder="YYYY"
            onChange={(e) => setYear(e.target.value)}
          />
          <small className="error-el">{yearError}</small>
        </div>
      </form>
    </div>
  );
}

function LineButton({ onSubmit }) {
  return (
    <div className="btn__flex">
      <div className="line"></div>

      <button className="circle__btn" onClick={onSubmit}>
        <img
          src="/assets/images/icon-arrow.svg"
          alt="icon-arrow"
          className="image-btn"
        />
      </button>
    </div>
  );
}

function ContainerContent({ age }) {
  const isAgeValid = age && Object.keys(age).every(key => age[key] >= 0);

  return (
    <div>
      {isAgeValid ? (
        <div>
          <div className="container">
            <h1 className="years__cont">{age.days}</h1>
            <h2 className="years">days</h2>
          </div>
          <div className="container">
            <h1 className="years__cont">{age.months}</h1>
            <h2 className="years">months</h2>
          </div>
          <div className="container">
            <h1 className="years__cont">{age.years}</h1>
            <h2 className="years">years</h2>
          </div>
        </div>
      ) : (
        <div>
          <div className="container">
            <h1 className="years__cont">_ _</h1>
            <h2 className="years">days</h2>
          </div>
          <div className="container">
            <h1 className="years__cont">_ _</h1>
            <h2 className="years">months</h2>
          </div>
          <div className="container">
            <h1 className="years__cont">_ _</h1>
            <h2 className="years">years</h2>
          </div>
        </div>
      )}
    </div>
  );
}