//Функция проверки на высокосный год
function isLeapYear(year){ return (year % 4 == 0)}

//Функция возвращает колличество дней в месяце в зависимости от года
function getDays(month, year) {
    // Создаем массив, для хранения числа дней в каждом месяце
    var ar = new Array(12)
    ar[0] = 31 // Январь
    ar[1] = (isLeapYear(year)) ? 29 : 28 // Февраль
    ar[2] = 31 // Март
    ar[3] = 30 // Апрель
    ar[4] = 31 // Май
    ar[5] = 30 // Июнь
    ar[6] = 31 // Июль
    ar[7] = 31 // Август
    ar[8] = 30 // Сентябрь
    ar[9] = 31 // Остябрь
    ar[10] = 30 // Ноябрь
    ar[11] = 31 // Декабрь
    return ar[month];
}

//Функция возвращает название месяца
function getMonthName(month, nameMonth) {
    // Создаем массив, для хранения названия каждого месяца
    var ar = new Array(12);
    if (nameMonth=="rus"||nameMonth=="russ"||nameMonth=="russs") {
        ar[0] = "Январь"
        ar[1] = "Феврать"
        ar[2] = "Март"
        ar[3] = "Апрель"
        ar[4] = "Май"
        ar[5] = "Июнь"
        ar[6] = "Июль"
        ar[7] = "Август"
        ar[8] = "Сентабрь"
        ar[9] = "Октябрь"
        ar[10] = "Ноябрь"
        ar[11] = "Декабрь"
    } else {
        ar[0] = "January"
        ar[1] = "February"
        ar[2] = "March"
        ar[3] = "April"
        ar[4] = "May"
        ar[5] = "June"
        ar[6] = "July"
        ar[7] = "August"
        ar[8] = "September"
        ar[9] = "October"
        ar[10] = "November"
        ar[11] = "December"
    }
    return ar[month];
}

// Функция, возвращает количество строк, необходимых для отображения в текущем месяце
export function getRowCount(date) {
    // Переменные 
    var date = new Date(date);
    var year = date.getYear()+1900;
    var month = date.getMonth();
    // var monthName = getMonthName(month, nameMonth);
    var day = date.getDate();
    date = null;
    var firstDayInstance = new Date(year, month, 1);
    var firstDay = firstDayInstance.getDay();
    firstDayInstance = null;
    // Число дней в текущем месяце
    var lastDate = getDays(month, year);
    const rowCount = (Math.ceil((lastDate + firstDay) / 7) + 1);
    return rowCount;
}

export default function(canvasContext, bdate, currentMonth, height) {
    // const canvas = document.getElementById("canvas");
    // if (canvas.getContext) {
    //   var ctx = canvas.getContext("2d");
    const date = new Date(currentMonth);
    const year = date.getYear()+1900;
    const month = date.getMonth(),
          curDate = new Date(date);
    curDate.setDate(1);
    const lastDate = getDays(month, year);
    const firstDayInstance = new Date(year, month, 1);
    const firstDay = firstDayInstance.getDay(),
          nowDate = new Date(),
          nowMonth = nowDate.getMonth(),
          nowDay = nowDate.getDate();
    let curDay = 1,
        x = 0,
        y = height,
        dayNumber = 1;
    const weekDayName = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];

    // функция рисования галочки
    const drawCheck = (x, y) => {
        const newX = x+12, newY = y+5;
        canvasContext.beginPath();
        canvasContext.moveTo(0+newX,14+newY);
        canvasContext.lineTo(5+newX,20+newY);
        canvasContext.lineTo(20+newX,0+newY);
        canvasContext.lineTo(18+newX,2+newY);
        canvasContext.lineTo(6+newX,16+newY);
        canvasContext.fill();
    }

    canvasContext.fillText(getMonthName(nowMonth), x+40, y+30);
    canvasContext.font = 'bold 11px sans-serif';
    y += 40;

    for (let row=1; row <= getRowCount(currentMonth); row++) {
        // debugger;
        for (let i=1; i <= 7; i++) {
            // рисуем ячейку с заданными координатами
            if (dayNumber > lastDate) break;
            // debugger;
            if (row === 1) {
                // debugger;
                canvasContext.strokeRect(x, y, 30, 30);
                canvasContext.fillStyle = "rgba(225,225,225,30)";
                canvasContext.fillRect(x, y, 30, 30);
                canvasContext.fillStyle = "black";
                canvasContext.fillText(weekDayName[i-1], x+15, y+15);
            }
            else {
                canvasContext.strokeRect(x, y, 30, 30);
                if (!(curDay < firstDay)) {
                    canvasContext.fillText(dayNumber, x+15, y+15);

                    // ставим галочку, если дата меньше текущей
                    if ((bdate <= curDate) && ((nowDate > date && nowMonth !== month) || (nowMonth === month && nowDay >= dayNumber))) {
                        canvasContext.fillStyle = "green";
                        drawCheck(x, y);
                    }
                    dayNumber++;
                    curDate.setDate(curDate.getDate()+1);
                    canvasContext.fillStyle = "black";
                }
                curDay++;
            }

            x = x+30;
        }
        y = y+30;
        x = 0;
    }
    return y+40;
}