const storageKey = "myPushBtnCounter";
const resetEachDay = false;

function setLabelValue(newValue) {
  let label = document.getElementById("counter_out");
  if (!label) {
    console.log("Label for output was not found...");
    return;
  }
  label.innerText = newValue;
}

function shouldResetByDate(){
  if (!resetEachDay) return false;
  const lastDateStr = localStorage.getItem("myLastDate");
  if (!lastDateStr) {
    localStorage.setItem("myLastDate", (new Date().toISOString()) )
    return false;
  }
  const lastDate = new Date(lastDateStr);
  const now = new Date();
  localStorage.setItem("myLastDate", now);
  return lastDate.getFullYear()!=now.getFullYear() || lastDate.getMonth()!=now.getMonth() 
          || lastDate.getDate()!=now.getDate();
}

function increment(){
    const counter = Number(localStorage.getItem(storageKey)) + 1;
    localStorage.setItem(storageKey, counter.toString());
    setLabelValue(counter);
    return counter;
}

function init() {
    const counterStr = localStorage.getItem(storageKey);
    if (shouldResetByDate() || counterStr) {
      setLabelValue(counterStr);
    } else {
      localStorage.setItem(storageKey, "0");
      setLabelValue("0")
    }
    const counterBtn = document.getElementById("counter_btn");
    counterBtn.addEventListener("click", increment);
    const resetBtn = document.getElementById("reset_btn");
    resetBtn.addEventListener("click", (anyEvent) => {localStorage.setItem(storageKey, "0"); setLabelValue(0);} );
}

init();
console.log("Done")
