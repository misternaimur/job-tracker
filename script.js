let currentTab = "all";

// DOM Elements
const allCards = document.querySelectorAll(".job-card");

const allContainer = document.getElementById("all-container");
const interviewContainer = document.getElementById("interview-container");
const rejectedContainer = document.getElementById("rejected-container");

const totalStat = document.getElementById("stat-total");
const interviewStat = document.getElementById("stat-interview");
const rejectedStat = document.getElementById("stat-rejected");

const emptyState = document.getElementById("empty-state");

const realJobCount = document.getElementById("real-job-count");


function checkEmptyState(container){
    if(container.querySelectorAll(".job-card").length === 0){
        emptyState.classList.remove("hidden");
    } else {
        emptyState.classList.add("hidden");
    }
}


function switchTab(tab) {
    currentTab = tab;

    ["all", "interview", "rejected"].forEach(t => {
        const btn = document.getElementById("tab-" + t);
        if(t === tab){
            btn.classList.add("bg-blue-600", "text-white");
            btn.classList.remove("bg-gray-200", "text-black");
        } else {
            btn.classList.remove("bg-blue-600", "text-white");
            btn.classList.add("bg-gray-200", "text-black");
        }
    });

    if(tab === "all"){
        allContainer.classList.remove("hidden");
        interviewContainer.classList.add("hidden"); 
        rejectedContainer.classList.add("hidden");
        checkEmptyState(allContainer);
    } 
    else if(tab === "interview"){
        allContainer.classList.add("hidden");
        interviewContainer.classList.remove("hidden");
        rejectedContainer.classList.add("hidden");
        checkEmptyState(interviewContainer);
    } 
    else if(tab === "rejected"){
        allContainer.classList.add("hidden");
        interviewContainer.classList.add("hidden");
        rejectedContainer.classList.remove("hidden");
        checkEmptyState(rejectedContainer);
    }
}


switchTab("all");

document.addEventListener("click", function(event){
    const clickedElement = event.target;
    const card = clickedElement.closest(".job-card");

    if(!card) return; // null safety

    const parent = card.parentNode;
    const status = card.querySelector(".status");

    if(clickedElement.classList.contains("btn-interview")){
        if(status) status.innerText = "interview";
        interviewContainer.appendChild(card);
    }

    if(clickedElement.classList.contains("btn-rejected")){
        if(status) status.innerText = "reject";
        rejectedContainer.appendChild(card);
    }

    if(clickedElement.classList.contains("btn-delete")){
        parent.removeChild(card);
    }

    updateStats();
});


function updateStats() {
   
    const total = allContainer.querySelectorAll(".job-card").length;
    const interview = interviewContainer.querySelectorAll(".job-card").length;
    const rejected = rejectedContainer.querySelectorAll(".job-card").length;

    totalStat.innerText = total;
    interviewStat.innerText = interview;
    rejectedStat.innerText = rejected;

    const currentCount = 
    (currentTab === "all")
     ? total :
                         
     (currentTab === "interview") 
     ? interview :
      rejected;


    realJobCount.innerText = currentCount;

    const currentContainer = 
    (currentTab === "all") 
    ? allContainer :
    (currentTab === "interview") 
    ? interviewContainer :
    rejectedContainer;

    checkEmptyState(currentContainer);
}

// Initial stats
updateStats();