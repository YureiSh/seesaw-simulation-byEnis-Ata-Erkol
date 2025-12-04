let x;
let left = 0;
let right = 0;
let leftT = 0;
let rightT = 0;
let angle = 0;
let kg = Math.floor(Math.random() * 10 + 1) + "kg";


const container = document.querySelector(".seesaw-container");
const board = document.querySelector(".board");
const weightParam = document.getElementById("weightParam");
const leftRightParam = document.getElementById("leftRightParam");
const angleParam = document.getElementById("angleParam");
let previewDiv = null;
weightParam.innerHTML = `${kg}`

function reset(){} //not functional for now

function myFunction(event) {
    x = event.offsetX; // Değişen x takibi
    document.getElementById("demo").innerHTML = "The x-coordinate is: " + x;

    if (!previewDiv) {
        previewDiv = document.createElement("div");
        previewDiv.classList.add("preview");
        previewDiv.id = "preview"
        previewDiv.style.position = "absolute";
        container.appendChild(previewDiv);
    }

    previewDiv.style.left = x + 210 + "px";
}

  function reset() {
    left = 0;
    right = 0;
    leftT = 0;
    rightT = 0;
    angle = 0;

    document.querySelectorAll(".weight").forEach((e) => e.remove());
    board.style.transform = `translateX(-50%) translateY(-50%) rotate(${angle}deg)`;
    leftRightParam.innerHTML = "0 kg / 0 kg";
    angleParam.innerHTML = "0.00 deg";
    localStorage.clear();
}

function mouseLeave() {
    if (document.getElementById("preview")) {
        document.getElementById("preview").remove();
        previewDiv = null
    }
}

function create() {
    playClick();
    const div = document.createElement("div");

    div.classList.add("weight", "start-up");
    div.style.left = x + "px";
    div.innerText = kg;
    kg = Math.floor(Math.random() * 10 + 1) + "kg";

    calculate(Number(div.innerText.replace("kg", "")), x)

    board.style.transform =
        `translateX(-50%) translateY(-50%) rotate(${angle}deg)`;

    board.appendChild(div);

    requestAnimationFrame(() => {
        div.classList.remove("start-up");
    });

    leftRightParam.innerHTML = `${left} kg / ${right} kg`
    weightParam.innerHTML = `${kg}`
    angleParam.innerHTML = `${angle.toFixed(2)} deg`
    saveState();
}
function calculate(mass, xPos) {
    const calcPos = Math.abs(x - 200) / 20;
    console.log(xPos);
    console.log(calcPos);
    if (xPos < 200) {
        left = mass + left;
        leftT = leftT + (mass * calcPos);
        console.log(`Right side is now ${right}kgs, Left T = ${leftT}`)
    } else if (xPos > 200) {
        right = mass + right;
        rightT = rightT + (mass * calcPos);
        console.log(`Right side is now ${right}kgs, Right T = ${rightT}`)
    } else {
        null;
    }
    angle = Math.max(-30, Math.min(30, (rightT - leftT)));
    return angle;
}

function playClick() {
    clickSound.currentTime = 0;
    clickSound.play();
}
// Yarın, kg ve loc torq hesabı yapıp, rotate'i ölçmek ve rotate'i gerçekleştirmek.
// Ardından reset tuşunu hazırlamak. ve parametre çıktılarını göstermek
// 1 preview done (kg'yi belki preview üstüne yazabiliriz?) (function ile halledilir random function)
// 2 torq hesabı ve rotate done animasyonlar da tamam
// reset tuşu done

function saveState() {
    const weights = Array.from(document.querySelectorAll(".weight")).map(div => ({
        left: div.style.left,
        top: div.style.top,
        text: div.innerText
    }));

    const state = {
        left,
        right,
        leftT,
        rightT,
        angle,
        weights
    };

    localStorage.setItem("seesawState", JSON.stringify(state));
}

window.addEventListener("DOMContentLoaded", () => {
    const saved = localStorage.getItem("seesawState");
    if (!saved) return;

    const state = JSON.parse(saved);
    left = state.left ?? 0;
    right = state.right ?? 0;
    leftT = state.leftT ?? 0;
    rightT = state.rightT ?? 0;
    angle = state.angle ?? 0;

    board.style.transform = `translateX(-50%) translateY(-50%) rotate(${angle}deg)`;

    state.weights.forEach(weight => {
        const div = document.createElement("div");
        div.style.left = weight.left;
        div.classList.add("weight");
        div.innerText = weight.text;

        board.appendChild(div);
        leftRightParam.innerHTML = `${left} kg / ${right} kg`
        angleParam.innerHTML = `${angle.toFixed(2)} deg`
    });
});