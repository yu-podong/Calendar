// today
const today = new Date(); //2월
let year = today.getFullYear();
let month = today.getMonth() + 1; //1

//calendar 모든 일수를 저장할 array
let thisDates = [];
//calendar를 형성해줄 HTML을 저장할 string
let daysHTMLSting = '';

// 필요한 태그 가져오기
const days = document.querySelector('.calendar-days');
const rightBtn = document.querySelector('.fa-caret-right');
const leftBtn = document.querySelector('.fa-caret-left');

//calendar 년도/월 출력
function printYearMonth(year, month) {
  const canlenderYM = document.querySelector('.year-month');
  canlenderYM.innerText = `${year}. ${month}`;
}

//calendar 모든 일수를 array에 저장
function fillThisDates(thisLast) {
  for (let i = 1; i <= thisLast.getDate(); i++) {
    thisDates.push(i);
  }
}

//calendar 이전 달의 요일 채우기
function fillPreDates(thisFirst, pre) {
  const preLastDate = pre.getDate();

  if (thisFirst.getDay() != 0) {
    //저번 달 마지막 날 요일
    let fillDay = pre.getDay();
    for (let date = preLastDate; fillDay >= 0; date--, fillDay--) {
      thisDates.unshift(date);
    }
  }
}

//calendar 다음 달의 일 채우기
function fillNextDates(thisLast, next) {
  const nextFirstDate = 1;
  if (thisLast.getDay() != 6) {
    let fillDay = next.getDay();
    for (let date = nextFirstDate; fillDay <= 6; date++, fillDay++) {
      thisDates.push(date);
    }
  }
}

//calendar 이번 달 HTML 생성
function makeThisMonthHTML() {
  for (let i = 0; i < thisDates.length; i = i + 7) {
    daysHTMLSting += `
      <ul>
          <li class="sun">&nbsp${thisDates[i]}</li>
          <li class="mon">&nbsp${thisDates[i + 1]}</li>
          <li class="tue">&nbsp${thisDates[i + 2]}</li>
          <li class="wed">&nbsp${thisDates[i + 3]}</li>
          <li class="thur">&nbsp${thisDates[i + 4]}</li>
          <li class="fri">&nbsp${thisDates[i + 5]}</li>
          <li class="sat">&nbsp${thisDates[i + 6]}</li>
      </ul>
      `;
  }
}

// 이번 달 달력 만들기
function makeThisMonthCalendar(year, month) {
  let pre = new Date(year, month - 1, 0);
  let next = new Date(year, month, 1);
  const thisFirst = new Date(year, month - 1, 1);
  const thisLast = new Date(year, month, 0);

  printYearMonth(year, month);
  fillThisDates(thisLast);
  fillPreDates(thisFirst, pre);
  fillNextDates(thisLast, next);
  makeThisMonthHTML();

  //calendar 이번 달 HTML 삽입
  days.innerHTML = daysHTMLSting;

  // 이전 or 다음 달의 calendar를 만들기 위해 기존의 데이터 비우기
  thisDates = [];
  daysHTMLSting = '';
}

// 저번 달 달력 만들기
function makePreMonthCalendar() {
  if (month - 1 == 0) {
    makeThisMonthCalendar(--year, (month = 12));
  } else {
    makeThisMonthCalendar(year, --month);
  }
}

// 다음 달 달력 만들기
function makeNextMonthCalendar() {
  if (month + 1 == 13) {
    makeThisMonthCalendar(++year, (month = 1));
  } else {
    makeThisMonthCalendar(year, ++month);
  }
}

/* main */
makeThisMonthCalendar(year, month);

rightBtn.addEventListener('click', makeNextMonthCalendar);
leftBtn.addEventListener('click', makePreMonthCalendar);
