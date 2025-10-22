
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

let UpdateSaved;

const liveResult = document.getElementById("liveResult");
let calcDisplay = document.getElementById("calcDisplay");

function ADDBUTTON(){
let DisplayBal = document.getElementById("DisplayBal");
let DisplaySpent = document.getElementById("DisplaySpent");
let DisplaySaved = document.getElementById("DisplaySaved");
let empTy = document.getElementById("empTy");
let glass = document.getElementById("glass");
let glassCont = document.getElementById("glassCont");
let Categories = document.getElementById("Categories");
let BalCat = document.getElementById("BalCat");
let SpentCat = document.getElementById("SpentCat");
let SavedCat = document.getElementById("SavedCat");
let NextBtn1 = document.getElementById("NextBtn1");
let NextBtn2 = document.getElementById("NextBtn2");
let Amount = document.getElementById("Amount");
let EditCat = document.getElementById("EditCat");
let EditAmount = document.getElementById("EditAmount");
let EditTitle = document.getElementById("EditTitle");
let EditDate = document.getElementById("EditDate");
let titleInput = document.getElementById("titleInput");
let FinalReview = document.getElementById("FinalReview");
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
})

document.addEventListener("mousemove", (e) => {
  if (!isClickedon) return;

  const dx = e.clientX - startX;
  const dy = e.clientY - startY;
  if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
    moved = true;
  }


  const btnWidth = addBtn.offsetWidth;
  const btnHeight = addBtn.offsetHeight;
  const maxX = window.innerWidth - btnWidth;
  const maxY = window.innerHeight - btnHeight;


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


  const btnWidth = addBtn.offsetWidth;
  const btnHeight = addBtn.offsetHeight;
  const maxX = window.innerWidth - btnWidth;
  const maxY = window.innerHeight - btnHeight;


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


addBtn.addEventListener("click", () => {
  if (!moved) {
  Cat = true;
  glassCont.style.display = 'flex';
  glass.classList.add("glass-CAT");
  glass.style.display = 'flex';
  Categories.style.display = 'flex';
  document.body.style.overflow = 'hidden';
    }
});

function cleanupEmptyEntryBoxes() {
  const entryBoxes = document.querySelectorAll(".EntryBox");
  entryBoxes.forEach(box => {
    if (!box.querySelector(".Entries-Balance") &&
        !box.querySelector(".Entries-Spent") &&
        !box.querySelector(".Entries-Saved")) {
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

function saveAllData() {
  const data = {
    DisplayBal: document.getElementById("DisplayBal").textContent,
    DisplaySpent: document.getElementById("DisplaySpent").textContent,
    DisplaySaved: document.getElementById("DisplaySaved").textContent,
    entries: []
  };

  document.querySelectorAll(".EntryBox").forEach(box => {
    const date = box.dataset.date;
    box.querySelectorAll(".Entries-Balance, .Entries-Spent, .Entries-Saved").forEach(entry => {
      data.entries.push({
        date: date,
        cat: entry.dataset.cat,
        title: entry.dataset.title,
        amount: entry.dataset.amount,
        color: entry.style.color
      });
    });
  });

  localStorage.setItem("financeData", JSON.stringify(data));
}

function loadAllData() {
  const saved = localStorage.getItem("financeData");
  if (!saved) return;

  const data = JSON.parse(saved);

  document.getElementById("DisplayBal").textContent = data.DisplayBal;
  document.getElementById("DisplaySpent").textContent = data.DisplaySpent;
  document.getElementById("DisplaySaved").textContent = data.DisplaySaved;

  data.entries.forEach(entry => {
    ensureEntryBox(entry.date);
    addEntry(entry.date, entry.cat, entry.color, entry.title, Number(entry.amount));
  });
}

function clearAllData() {
  localStorage.removeItem("financeData");
  localStorage.removeItem("financeData2");
  localStorage.setItem("UpdateSaved", 0);

  if (!localStorage.getItem("reloadedOnce")) {
    localStorage.setItem("reloadedOnce", "true");
    location.reload();
  } else {
    localStorage.removeItem("reloadedOnce");
  }
}

window.addEventListener("DOMContentLoaded", () => {
  cleanupEmptyEntryBoxes();
  checkNoEntries();
  const today = new Date().toISOString().split("T")[0];
  EditDate.value = today;

  loadAllData();

  let lastSavedDate = localStorage.getItem("lastSavedDate");
  let savedTotal = Number(localStorage.getItem("UpdateSaved")) || 0;

  if (lastSavedDate) {
    let lastDate = new Date(lastSavedDate);
    let now = new Date(today);


    let daysDiff = Math.floor((now - lastDate) / (1000 * 60 * 60 * 24));

    if (daysDiff > 0) {
      for (let i = 1; i <= daysDiff; i++) {

        let autoDate = new Date(lastDate);
        autoDate.setDate(autoDate.getDate() + i);

        let autoDateStr = autoDate.toISOString().split("T")[0];


        savedTotal += 20;
        let DisplaySaved = document.getElementById("DisplaySaved");
        let DisplayBal = document.getElementById("DisplayBal");
        DisplaySaved.textContent = `৳${savedTotal}`;
        DisplayBal.textContent = "৳" + (Number(DisplayBal.textContent.slice(1)) - 20);


        ensureEntryBox(autoDateStr);
        addEntry(autoDateStr, "Saved", "#F99D46", "Daily Auto-Save", 20);
      }


      localStorage.setItem("UpdateSaved", savedTotal);
      saveAllData();
    }
  }

  localStorage.setItem("lastSavedDate", today);

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
  Categories.style.display = 'none';
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
    EntryBox.dataset.date = date;

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
      glass.classList.add("glass-CAT");
      glass.style.display = 'flex';
      Categories.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    });

    insertSorted(EntryBox);
    checkNoEntries();
  }
  return EntryBox;
}

function addEntry(date, cat, color, title, amount) {
  const uniqueId = Date.now().toString(); // ✅ safe unique ID
  const BEntry = document.createElement("div");
  BEntry.className = `Entries-${cat}`;
  BEntry.id = `Entries-${uniqueId}`;
  BEntry.dataset.date = date;
  BEntry.dataset.title = title;
  BEntry.dataset.amount = amount;
  BEntry.dataset.cat = cat;
  BEntry.style.color = color;
  BEntry.innerHTML = `
    <div class="HoldTitle">${title}</div>
    <div class="HoldBtn" id="HoldBtn-${uniqueId}">
      <div class="editBtn" id="editBtn-${uniqueId}">Edit</div>
      <div class="deleteBtn" id="deleteBtn-${uniqueId}">Delete</div>
    </div>
    <div class="HoldAmount">৳${amount}</div>
  `;

  // ✅ Toggle buttons
  BEntry.addEventListener("click", (e) => {
    e.stopPropagation();
    document.querySelectorAll(".Entries-clicked").forEach(entry => {
      if (entry !== BEntry) {
        entry.classList.remove("Entries-clicked");
        entry.querySelector(".HoldBtn").classList.remove("HoldBtn-vis");
      }
    });

    BEntry.classList.toggle("Entries-clicked");
    BEntry.querySelector(".HoldBtn").classList.toggle("HoldBtn-vis");
  });

  // ✅ Delete event
  const deleteBtn = BEntry.querySelector(`#deleteBtn-${uniqueId}`);
  deleteBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    BEntry.remove();
    updateValues(cat, -amount);
    cleanupEmptyEntryBoxes();
    checkNoEntries();
    saveAllData();
  });

  // ✅ Edit event
  const editBtn = BEntry.querySelector(`#editBtn-${uniqueId}`);
  editBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    Categories.style.display = 'none';
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

function updateValues(cat, amount) {
  if (cat === "Balance") {
    DisplayBal.textContent = "৳" + (Number(DisplayBal.textContent.slice(1)) + amount);
  } else if (cat === "Spent") {
    DisplaySpent.textContent = "৳" + (Number(DisplaySpent.textContent.slice(1)) + amount);
    DisplayBal.textContent = "৳" + (Number(DisplayBal.textContent.slice(1)) - amount);
  } else if (cat === "Saved") {
    UpdateSaved = (Number(DisplaySaved.textContent.slice(1)) + amount);
    DisplaySaved.textContent = `৳${UpdateSaved}`;
    DisplayBal.textContent = "৳" + (Number(DisplayBal.textContent.slice(1)) - amount);

    localStorage.setItem("UpdateSaved", UpdateSaved);
    saveAllData();
  }
}

glass.addEventListener("click", (e) =>{

if (e.target === BalCat || e.target === SpentCat || e.target === SavedCat) {
    glass.classList.remove("glass-CAT");
    
    if (e.target === BalCat) {
        EditCat.value = "Balance";
    } else if (e.target === SpentCat) {
        EditCat.value = "Spent";
    } else if (e.target === SavedCat) {
        EditCat.value = "Saved";
    }

    Title.style.display = 'flex';
    Categories.style.display = 'none';
    document.body.style.overflow = 'hidden';
}

  else if(e.target === NextBtn1){
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
  
else if(e.target.closest("#NextBtn2")) {
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
  const cat = EditCat.value;
  const title = EditTitle.value;
  const amount = Number(EditAmount.value.slice(1));

  if (Confirm.dataset.editing) {
    const entryId = Confirm.dataset.editing;
    const existing = document.getElementById(entryId);

    if (existing) {
      console.log(existing.dataset.cat);
      updateValues(existing.dataset.cat, -Number(existing.dataset.amount));

      existing.remove();
      ensureEntryBox(date);
      const colors = { Balance: "#8D9B66", Spent: "#FF6961", Saved: "#F99D46" };
      addEntry(date, cat, colors[cat], title, amount);

      updateValues(cat, amount);

cleanupEmptyEntryBoxes();
checkNoEntries();

    }

    delete Confirm.dataset.editing;
  } else {
    ensureEntryBox(date);
    const colors = { Balance: "#8D9B66", Spent: "#FF6961", Saved: "#F99D46" };
    addEntry(date, cat, colors[cat], title, amount);
    updateValues(cat, amount);
  }

  closeOverlay();
  saveAllData();

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
ADDBUTTON();
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

  document.getElementById("acc2").addEventListener("click", () => {
  window.location.href = "4page2.html";
});

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service-worker.js")
    .then(() => console.log("Service Worker Registered"))
    .catch(err => console.log("SW registration failed:", err));
}


