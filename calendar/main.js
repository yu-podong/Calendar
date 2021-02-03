// today
const today = new Date(); //2월
const year = today.getFullYear();
const month = today.getMonth(); //1
const thisFirst = new Date(year, month, 1);     //월요일 2월 1일
const thisLast = new Date(year, month+1, 0);    //일요일 2월 28일

//pre
let pre = new Date(year, month,0);  //1월
const preMonth = pre.getMonth()+1;
const preLastDate = pre.getDate();
console.log(pre, preMonth, preLastDate);

//next
let next = new Date(year, month+1, 1);  //3월
const nextMonth = next.getMonth()+1;
const nextFirstDate = 1;
console.log(next, nextMonth, nextFirstDate);

//calendar 년도/월 출력
const canlenderYM = document.querySelector('.year-month');
canlenderYM.innerText = `${year}. ${month+1}`;

//calendar 모든 일수를 array에 저장
const thisDates = [];

for (let i=1; i <= thisLast.getDate(); i++)
    thisDates.push(i);

console.log(thisDates);

//calendar 이전 달의 요일 채우기
if(thisFirst.getDay() != 0) {
    //저번 달 마지막 날 요일
    let fillDay = pre.getDay();
    for (let date = preLastDate ; fillDay >= 0; date--, fillDay--) {
        thisDates.unshift(date);
    }
}

//calendar 다음 달의 일 채우기
if(thisLast.getDay() != 6) {
    let fillDay = next.getDay();
    for (let date = 1; fillDay <= 6; date++, fillDay++) {
        thisDates.push(date);
    }
}

console.log(thisDates);

//calendar 이번 달 HTML 생성
let daysHTMLSting = '';
const days = document.querySelector('.calendar-days');

for (let i = 0; i < thisDates.length; i=i+7) {
    daysHTMLSting += `
    <ul>
        <li class="sun">&nbsp${thisDates[i]}</li>
        <li class="mon">&nbsp${thisDates[i+1]}</li>
        <li class="tue">&nbsp${thisDates[i+2]}</li>
        <li class="wed">&nbsp${thisDates[i+3]}</li>
        <li class="thur">&nbsp${thisDates[i+4]}</li>
        <li class="fri">&nbsp${thisDates[i+5]}</li>
        <li class="sat">&nbsp${thisDates[i+6]}</li>
    </ul>
    `;
}

//calendar 이번 달 HTML 삽입
days.innerHTML = daysHTMLSting;