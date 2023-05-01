const calendar = document.querySelector("#calendar");
const monthBanner = document.querySelector("#month");
let navigation = 0;
const events = localStorage.getItem("events") ? JSON.parse(localStorage.getItem("events")) : [];
const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function loadCalendar() {
    const dt = new Date();
    if (navigation != 0) {
        dt.setMonth(new Date().getMonth() + navigation);
    }
    const day = dt.getDate();
    const month = dt.getMonth();
    const year = dt.getFullYear();
    console.log(day, month, year)
    monthBanner.innerText = `${dt.toLocaleDateString("en-us", { month: "long" })}${year}`;//年月日のバナー設定、month longで現在の月を入手。
    calendar.innerHTML = "";
    const dayInMonth = new Date(year, month + 1, 0).getDate();//月は前の月が取得されるので＋１する。０で最後の日付を取得。
    console.log(dayInMonth);
    const firstdayofMonth = new Date(year, month, 1);//月初めの曜日を取得。
    console.log(firstdayofMonth);

    const dateText = firstdayofMonth.toLocaleDateString("en-us", {
        weekday: "long",
        year: "numeric",
        month: "numeric",
        day: "numeric",
    });
    const dayString = dateText.split(", ")[0];
    const emptyDays = weekdays.indexOf(dayString);

    for (let i = 1; i <= dayInMonth + emptyDays; i++) {
        const dayBox = document.createElement("div");
        dayBox.classList.add("day");
        const dateText = `${i - emptyDays}-${month + 1}-${year}`;
        console.log(dateText);
        if (i > emptyDays) {
            dayBox.innerText = i - emptyDays;
            //const eventOfTheDay = events.find((e) => e.date ==);
            if (i - emptyDays === day && navigation == 0) {
                dayBox.id = "currentDay";
            }
            dayBox.addEventListener("click", () => {
                showModal();
            });
        } else {
            dayBox.classList.add("plain");
        }
        calendar.append(dayBox);
    }
}
function buttons() {
    const btnBack = document.querySelector("#btnBack");
    const btnNext = document.querySelector("#btnNext");

    btnBack.addEventListener("click", () => {
        navigation--;
        loadCalendar();
    });
    btnNext.addEventListener("click", () => {
        navigation++;
        loadCalendar();
    });
}

//イベント入力
//const modal = document.querySelector("#modal");
//function showModal() {
//    modal.style.display = "block";
//}
buttons();
loadCalendar();


//トレーニングメニュー
window.onload = function () {
    const list = {
        "10km JOG": 10,
        "10km ペース走": 15,
        "400m*12本": 20,
        "1000m*12本": 25,
        "20km LSD": 15,
        "体幹トレーニング": 10,
        "レスト": 5,
    };

    document.getElementById("button").onclick = function () {
        var random = Math.floor(Math.random() * 100);
        var rate = 0;
        for (var data in list) {
            rate += list[data];
            if (random <= rate) {
                document.getElementById("result").textContent = data;
                return;
            }
        }
    }
}