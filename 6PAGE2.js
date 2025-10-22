
const dropDown = document.getElementById("dropDown");
const Drawer = document.getElementById("Drawer");

function Drawerr(){
let isDragging = false;
let startY = 0;
let startTop = -150;
let maxTop = 0;
let minTop =-150;

Drawer.addEventListener("mousedown", startDrag);
Drawer.addEventListener("touchstart", startDrag);

function startDrag(e) {
  isDragging = true;
  e.preventDefault();
  Drawer.style.cursor = "grabbing";
  startY = e.type === "touchstart" ? e.touches[0].clientY : e.clientY;
  startTop = parseInt(window.getComputedStyle(dropDown).top);
  document.addEventListener("mousemove", drag);
  document.addEventListener("mouseup", stopDrag);
  document.addEventListener("touchmove", drag);
  document.addEventListener("touchend", stopDrag);
}

function drag(e) {
  if (!isDragging) return;
  const clientY = e.type.startsWith("touch") ? e.touches[0].clientY : e.clientY;

  let newTop = startTop + (clientY - startY);
  newTop = Math.min(maxTop, Math.max(minTop, newTop));

  dropDown.style.top = newTop + "px";
  Drawer.style.top = newTop + 150 + "px"; // move together
}

function stopDrag() {
  isDragging = false;

  const currentTop = parseInt(dropDown.style.top);
  if (currentTop > (minTop + maxTop) / 2) {
    dropDown.style.top = maxTop + "px";
    Drawer.style.top = 150 + "px";
  } else {
    dropDown.style.top = minTop + "px";
    Drawer.style.top = 0 + "px";
  }

  document.removeEventListener("mousemove", drag);
  document.removeEventListener("mouseup", stopDrag);
  document.removeEventListener("touchmove", drag);
  document.removeEventListener("touchend", stopDrag);
}
};
Drawerr();

var Balance = document.getElementById("Balance");
var Spent = document.getElementById("Spent");
var Saved = document.getElementById("Saved");

Balance.addEventListener("click", () => {
  Balance.classList.toggle("BalTrans");
  Spent.classList.toggle("SpentTrans");
  Saved.classList.toggle("SavedTrans");
});

const liveResult = document.getElementById("liveResult");
let calcDisplay = document.getElementById("calcDisplay");

function ADDBUTTON2(){
let DisplayBal = document.getElementById("DisplayBal");
let DisplaySpent = document.getElementById("DisplaySpent");
let DisplaySaved = document.getElementById("DisplaySaved");
let glass = document.getElementById("glass");
let glassCont = document.getElementById("glassCont");
let NextBtn1 = document.getElementById("NextBtn1");
let NextBtn2 = document.getElementById("NextBtn2");
let Amount = document.getElementById("Amount");
let EditAmount = document.getElementById("EditAmount");
let EditTitle = document.getElementById("EditTitle");
let EditDate = document.getElementById("EditDate");
let titleInput = document.getElementById("titleInput");
let Confirm = document.getElementById("Confirm");
let EnBase = document.getElementById("EnBase");
const addBtn = document.getElementById("addBtn");
let Cat = false;
let isClickedon = false;
let startX, startY, offsetX, offsetY;
let moved = false;

addBtn.addEventListener("mousedown", (e) => {
  isClickedon = true;
  moved = false;
  startX = e.clientX;
  startY = e.clientY;
  offsetX = e.clientX - addBtn.getBoundingClientRect().left;
  offsetY = e.clientY - addBtn.getBoundingClientRect().top;
});

document.addEventListener("mousemove", (e) => {
  if (!isClickedon) return;

  const dx = e.clientX - startX;
  const dy = e.clientY - startY;
  if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
    moved = true;
  }

  // Get viewport size and button size
  const btnWidth = addBtn.offsetWidth;
  const btnHeight = addBtn.offsetHeight;
  const maxX = window.innerWidth - btnWidth;
  const maxY = window.innerHeight - btnHeight;

  // Clamp left and top
  let newLeft = e.clientX - offsetX;
  let newTop = e.clientY - offsetY;

  if (newLeft < 0) newLeft = 0;
  if (newTop < 0) newTop = 0;
  if (newLeft > maxX) newLeft = maxX;
  if (newTop > maxY) newTop = maxY;

  addBtn.style.left = `${newLeft}px`;
  addBtn.style.top = `${newTop}px`;
  addBtn.style.right = "auto";
  addBtn.style.bottom = "auto";
  addBtn.style.position = "fixed";
});


    document.addEventListener("mouseup", () => {
      isClickedon = false;
    });

    // Touch Events
    addBtn.addEventListener("touchstart", (e) => {
      isClickedon = true;
      moved = false;
      const touch = e.touches[0];
      startX = touch.clientX;
      startY = touch.clientY;
      offsetX = touch.clientX - addBtn.getBoundingClientRect().left;
      offsetY = touch.clientY - addBtn.getBoundingClientRect().top;
    });

    document.addEventListener("touchmove", (e) => {
      if (!isClickedon) return;
  const dx = e.clientX - startX;
  const dy = e.clientY - startY;
  if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
    moved = true;
  }

  // Get viewport size and button size
  const btnWidth = addBtn.offsetWidth;
  const btnHeight = addBtn.offsetHeight;
  const maxX = window.innerWidth - btnWidth;
  const maxY = window.innerHeight - btnHeight;

  // Clamp left and top
  let newLeft = e.clientX - offsetX;
  let newTop = e.clientY - offsetY;

  if (newLeft < 0) newLeft = 0;
  if (newTop < 0) newTop = 0;
  if (newLeft > maxX) newLeft = maxX;
  if (newTop > maxY) newTop = maxY;

  addBtn.style.left = `${newLeft}px`;
  addBtn.style.top = `${newTop}px`;
  addBtn.style.right = "auto";
  addBtn.style.bottom = "auto";
  addBtn.style.position = "fixed";
});

document.addEventListener("touchend", () => {
  isClickedon = false;
});

/*------------------------------------------------------------------------
-------------------------------------------------
-----------------------------*/

function cleanupEmptyEntryBoxes() {
  const entryBoxes = document.querySelectorAll(".EntryBox");
  entryBoxes.forEach(box => {
    if (!box.querySelector(".Entries")) {
      box.remove();
    }
  });
}
function checkNoEntries() {
  const entryBoxes = EnBase.querySelectorAll(".EntryBox");

  if (entryBoxes.length === 0) {
    empTy.style.display = "flex";
  } else {
    empTy.style.display = "none";
  }
}

function saveData() {
  const data = {
    DisplaySpent2: document.getElementById("DisplaySpent").textContent,
    entries2: []
  };

  document.querySelectorAll(".EntryBox").forEach(box => {
    const date = box.dataset.date;
    box.querySelectorAll(".Entries").forEach(entry => {
      data.entries2.push({
        date: date,
        title: entry.dataset.title,
        amount: entry.dataset.amount,
      });
    });
  });

  localStorage.setItem("financeData2", JSON.stringify(data));
}

function loadData() {
  const saved = localStorage.getItem("financeData2");
  if (!saved) return;

  const data = JSON.parse(saved);

  const UpdateSaved = Number(localStorage.getItem("UpdateSaved")) || 0;
  DisplaySaved.textContent = "৳" + UpdateSaved;
  document.getElementById("DisplaySpent").textContent = data.DisplaySpent2;
  const SecretStash = UpdateSaved - Number(data.DisplaySpent2.slice(1));
  document.getElementById("DisplayBal").textContent = "৳" + SecretStash;

  data.entries2.forEach(entry => {
    ensureEntryBox(entry.date);
    addEntry(entry.date, entry.title, Number(entry.amount));
  });
}

window.addEventListener("DOMContentLoaded", () => {
  saveData();
  loadData();
  cleanupEmptyEntryBoxes();
  checkNoEntries();
  EditDate.value = new Date().toISOString().split("T")[0];
});


function insertSorted(newDiv) {
    const newDate = new Date(newDiv.getAttribute("data-date"));
    const existingDivs = EnBase.querySelectorAll(".EntryBox");

    let inserted = false;
    existingDivs.forEach(div => {
      const divDate = new Date(div.getAttribute("data-date"));
      if (newDate > divDate && !inserted) {
        EnBase.insertBefore(newDiv, div);
        inserted = true;
      }
    });

    if (!inserted) {
      EnBase.appendChild(newDiv);
    }
  }
function closeOverlay() {
  glass.classList.remove("Calc");
  glassCont.style.display = 'none';
  glass.style.display = 'none';
  FinalReview.style.display = 'none';
  Amount.style.display = 'none';
  Title.style.display = 'none';
  document.body.style.overflow = '';
  titleInput.value = "";
  calcDisplay.value = "";
  liveResult.textContent = 0;
  EditDate.value = new Date().toISOString().split("T")[0];
}

function ensureEntryBox(date) {
  let EntryBox = document.querySelector(`.EntryBox[data-date='${date}']`);
  if (!EntryBox) {
    EntryBox = document.createElement("div");
    EntryBox.classList.add("EntryBox");
    EntryBox.setAttribute("data-date", date);


    EntryBox.innerHTML = `
      <div class="EntryDate" id="EntryDate-${date}"></div>
      <div class="BSSEntry" id="BSSEntry-${date}"></div>
    `;
    EnBase.appendChild(EntryBox);

const heading = document.createElement("p");

const d = new Date(date);

heading.textContent = d.toLocaleDateString("en-US", { 
  weekday: "long", 
  month: "short", 
  day: "2-digit", 
  year: "numeric" 
});

heading.className = "heading";
document.getElementById(`EntryDate-${date}`).appendChild(heading);

    let rightNow = Date.now();
    const subOptions = document.createElement("div");
    subOptions.className = "subOptions";
    subOptions.innerHTML = `<div class="Minimize" id="Minimize">-</div>
    <div class="addTo" id="addTo${rightNow}">+</div>`;
    document.getElementById(`EntryDate-${date}`).appendChild(subOptions);
    const Minimize = subOptions.querySelector(".Minimize");
    const addTo = subOptions.querySelector(".addTo");
    addTo.dataset.date = date;

    Minimize.addEventListener("click", () => {
      document.getElementById(`BSSEntry-${date}`).classList.toggle("BSSEntry-hide");
    });

    addTo.addEventListener("click", () => {
      EditDate.value = addTo.dataset.date;
      Cat = true;
      glassCont.style.display = 'flex';
      glass.style.display = 'flex';
      Title.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    });

    insertSorted(EntryBox);
    checkNoEntries();
  }
  return EntryBox;
}

function addEntry(date, title, amount) {
  const BEntry = document.createElement("div");
  const UniqueDate = Date.now();
  BEntry.className = `Entries`;
  BEntry.id = `Entries-${UniqueDate}`;
  BEntry.dataset.date = date;
  BEntry.dataset.title = title;
  BEntry.dataset.amount = amount;
  BEntry.innerHTML = `
    <div class="HoldTitle">${title}</div>
    <div class="HoldBtn" id="HoldBtn-${UniqueDate}">
      <div class="editBtn" id="editBtn-${UniqueDate}">Edit</div>
      <div class="deleteBtn" id="deleteBtn-${UniqueDate}">Delete</div>
    </div>
    <div class="HoldAmount">$${amount}</div>
  `;

  // Toggle visibility of buttons when entry clicked
  BEntry.addEventListener("click", (e) => {
    e.stopPropagation();

    document.querySelectorAll(".Entries-clicked").forEach(entry => {
      if (entry !== BEntry) {
        entry.classList.remove("Entries-clicked");
        let btns = entry.querySelector(".HoldBtn");
        if (btns) btns.classList.remove("HoldBtn-vis");
      }
    });

    const HoldBtn = BEntry.querySelector(".HoldBtn");
    HoldBtn.classList.toggle("HoldBtn-vis");
    BEntry.classList.toggle("Entries-clicked");
  });

  // DELETE button (added once)
  const deleteBtn = BEntry.querySelector(`#deleteBtn-${UniqueDate}`);
  deleteBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    BEntry.remove();
    updateValues(-amount);
    cleanupEmptyEntryBoxes();
    checkNoEntries();
    saveData();
  });

  // EDIT button (added once)
  const editBtn = BEntry.querySelector(`#editBtn-${UniqueDate}`);
  editBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    Cat = true;
    glassCont.style.display = 'flex';
    glass.style.display = 'flex';
    glass.classList.add("Calc");
    document.body.style.overflow = 'hidden';
    FinalReview.style.display = 'flex';
    EditDate.value = BEntry.dataset.date;
    EditCat.value = BEntry.dataset.cat;
    EditTitle.value = BEntry.dataset.title;
    EditAmount.value = BEntry.dataset.amount;
    Confirm.dataset.editing = BEntry.id;
  });

  document.getElementById(`BSSEntry-${date}`).prepend(BEntry);
}

document.addEventListener("click", () => {
  document.querySelectorAll(".Entries-clicked").forEach(entry => {
    entry.classList.remove("Entries-clicked");
    let btns = entry.querySelector(".HoldBtn");
    if (btns) btns.classList.remove("HoldBtn-vis");
  });
});

function updateValues(amount) {

    DisplaySpent.textContent = "৳" + (Number(DisplaySpent.textContent.slice(1)) + amount);
    DisplayBal.textContent = "৳" + (Number(DisplayBal.textContent.slice(1)) - amount);

    saveData();
  }

/*-------------------------------------
-----------------------------*/
addBtn.addEventListener("click", () => {
  if (!moved) {
  Cat = true;
  glassCont.style.display = 'flex';
  glass.style.display = 'flex';
  Title.style.display = 'flex';
  document.body.style.overflow = 'hidden';
    }
});
/*------------------------------------
-----------------------------*/
glass.addEventListener("click", (e) =>{
  if(e.target === NextBtn1){
    e.preventDefault();

    if(titleInput.value === ""){
      e.preventDefault();
      titleInput.placeholder = "*title can't be empty nugget";
    }
    else {
    titleInput.placeholder = "Title";
    glass.classList.add("Calc");
    Amount.style.display = 'flex';
    Title.style.display = 'none';
    EditTitle.value = titleInput.value;
    }
    
  }
  
  else if(e.target === NextBtn2){
    if(calcDisplay.value === ""){
      e.preventDefault();
      calcDisplay.placeholder = "are you kidding me..?";
    }
    else if(Number(calcDisplay.value) === 0){
      e.preventDefault();
      calcDisplay.value = "";
      calcDisplay.placeholder = "are you kidding me..?";
    }
    else{
    e.preventDefault();
    calcDisplay.placeholder = "";
    FinalReview.style.display = 'flex';
    Amount.style.display = 'none';
    EditAmount.value ="৳"+ Number(liveResult.textContent.slice(1));
    }
  }

  else if(e.target === EditAmount){
   e.preventDefault();
   FinalReview.style.display = 'none';
   glass.classList.add("Calc");
   Amount.style.display = 'flex';
  }

else if (e.target === Confirm) {
  e.preventDefault();
  const date = EditDate.value;
  const title = EditTitle.value;
  const amount = Number(EditAmount.value.slice(1));

  if (Confirm.dataset.editing) {
    const entryId = Confirm.dataset.editing;
    const existing = document.getElementById(entryId);

    if (existing) {
      console.log(existing.dataset.cat);
      updateValues(-Number(existing.dataset.amount));

      existing.remove();
      ensureEntryBox(date);
      addEntry(date, title, amount);

      updateValues(amount);

      cleanupEmptyEntryBoxes();
      checkNoEntries();

    }

    delete Confirm.dataset.editing;
  } else {
    ensureEntryBox(date);
    addEntry(date, title, amount);
    updateValues(amount);
  }

  closeOverlay();
  saveData();
}

});
glassCont.addEventListener("click", (e) => {
  if (Cat && e.target === glassCont) {
    closeOverlay();
    titleInput.placeholder = "Title";
    calcDisplay.placeholder = "";
    clearAmount();
    Cat = false;
  }
});
};


ADDBUTTON2();
function pressNum(num) {
      calcDisplay.value += num;
      liveResult.textContent ="৳"+ eval(calcDisplay.value);
}
function clearAmount() {
      calcDisplay.value = "";
      liveResult.textContent ="৳"+0;
}
function deleteLast() {
      let val = calcDisplay.value;
      calcDisplay.value = val.slice(0, -1);

      if (calcDisplay.value.trim() === "") {
      liveResult.textContent ="৳"+0;
      } else {
      liveResult.textContent = "৳" + eval(calcDisplay.value);
      }

}
function calcuLate(){
      calcDisplay.value = eval(calcDisplay.value);
}

  document.getElementById("acc1").addEventListener("click", () => {
  window.location.href = "index.html";
});

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service-worker.js")
    .then(() => console.log("Service Worker Registered"))
    .catch(err => console.log("SW registration failed:", err));
}

