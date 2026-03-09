const loadingSpinner = document.getElementById("loadingSpinner");
const cardContainer = document.getElementById("cardContainer");

let cards = [];

const issueCount = document.getElementById("issueCount");
const allBtn = document.getElementById("allBtn");
const openBtn = document.getElementById("openBtn");
const closedBtn = document.getElementById("closedBtn");

async function fetchCard(){
    showLoading();
    cardContainer.innerHTML = "";
    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
    const data = await res.json();
    cards = data.data;
    // console.log(card);
    hideLoading();

    displayCard(cards);


}

function displayCard(cards){
    cards.forEach(item => {
        const cardDiv = document.createElement("div");
        cardDiv.onclick = () => showModalDetails(item);
        cardDiv.style.cursor = "pointer";
        cardDiv.innerHTML = `
            <div class="card bg-base-100 h-full shadow-xl border border-gray-100 overflow-hidden">
                <div class="card-body p-5 gap-4 border-t-6 ${item.status == "open"?"border-green-500": "border-purple-500" }">
                    <div class="flex justify-between items-center">
                        <div class="avatar placeholder">
                            <div>
                                <img src="${item.status == "open" ? "assets/Open-Status.png" : "assets/Closed-Status.png"}" alt="">
                            </div>
                        </div>
                        <span class="badge badge-error badge-outline uppercase 
                                ${item.priority === "medium" 
                                ? "bg-orange-100 text-orange-400" 
                                : item.priority === "low" 
                                ? "bg-indigo-100 text-indigo-400" 
                                : "bg-red-100 text-red-400"} 
                                font-bold py-3 px-6 border-none">
                                    ${item.priority}
                        </span>
                    </div>

                    <div class = "flex-grow space-y-3">
                        <h2 class="card-title text-sm font-bold">
                            ${item.title}
                        </h2>
                        <p class="text-slate-500 text-xs line-clamp-2">
                            ${item.description}
                        </p>
                    </div>

                    <div class="flex flex-wrap gap-2">
                        ${item.labels.map(label => `
                            <div class="badge badge-outline ${label === "enhancement"?"bg-green-100 text-green-500": label === "bug"? "bg-red-100 text-red-500": "bg-orange-100 text-orange-500"} gap-1 px-3 py-3 uppercase font-bold text-[9px]">
                                    ${label}
                            </div>
                        `).join('')}
                    </div>
                </div>

                <div class="border-t border-gray-300 p-5 pt-4 space-y-2">
                    <p class="text-slate-500 text-sm">${item.author}</p>
                    <p class="text-slate-500 text-sm">${item.createdAt}</p>
                </div>
            </div>
        `
        cardContainer.appendChild(cardDiv);
    })

    issueCount.innerText = `${cards.length} Issues`;
}

async function btnClicked(btnId) {
    showActive(btnId);
    showLoading();
    cardContainer.innerHTML = "";

    let filteredCards = [];

    if (btnId === 'openBtn') {
        filteredCards = cards.filter(item => item.status === "open");
    } else if (btnId === 'closedBtn') {
        filteredCards = cards.filter(item => item.status === "closed");
    } else {
        filteredCards = cards;
    }

    displayCard(filteredCards);
    hideLoading();
}

function showActive(btnId) {
    const buttons = [allBtn, openBtn, closedBtn];

    buttons.forEach(btn => {
        btn.classList.remove("btn-primary");
        btn.classList.add("btn-outline", "border-gray-200", "text-slate-500");
    });

    const selectedBtn = document.getElementById(btnId);
    selectedBtn.classList.add("btn-primary");
    selectedBtn.classList.remove("btn-outline", "border-gray-200", "text-slate-500");
}

function showLoading(){
    loadingSpinner.classList.remove("hidden");
    loadingSpinner.classList.add("block");
}

function hideLoading(){
    loadingSpinner.classList.remove("block");
    loadingSpinner.classList.add("hidden");
}

function showModalDetails(item) {
    const modal = document.getElementById('cardsModal');

    modal.innerHTML = `
        <div class="modal-box max-w-3xl p-8 bg-white rounded-2xl shadow-2xl relative">
            
            <h3 class="text-3xl font-bold text-slate-800 mb-4">${item.title}</h3>

            <div class="flex items-center gap-2 text-slate-500 text-sm mb-6">
                <span class="badge ${item.status === 'open' ? 'bg-emerald-500' : 'bg-purple-500'} text-white border-none py-3 px-4 rounded-full uppercase text-[10px]">
                    ${item.status === 'open'? item.status + "ed" : item.status}
                </span>
                <span>•</span>
                <span>Opened by ${item.author}</span>
                <span>•</span>
                <span>${item.createdAt}</span>
            </div>

            <div class="flex gap-3 mb-8">
                ${item.labels.map(label => `
                    <div class="badge badge-outline border-slate-200 text-slate-500 bg-green-100 gap-1 px-3 py-3 uppercase font-bold text-[10px]">
                        ${label}
                    </div>
                `).join('')}
            </div>

            <p class="text-slate-500 text-lg mb-10">
                ${item.description}
            </p>

            <div class="bg-slate-50 rounded-xl p-6 flex justify-between items-start mb-8">
                <div>
                    <p class="text-slate-400 text-sm mb-1">Assignee:</p>
                    <p class="text-slate-800 font-bold text-lg">${item.author}</p>
                </div>
                <div class="text-right">
                    <p class="text-slate-400 text-sm mb-1 text-left">Priority:</p>
                    <span class="badge ${item.priority === 'high' ? 'bg-red-500' : item.priority === 'medium' ? 'bg-orange-500' : 'bg-indigo-500'} text-white border-none font-bold py-4 px-6 rounded-lg uppercase text-xs">
                        ${item.priority}
                    </span>
                </div>
            </div>

            <div class="modal-action">
                <form method="dialog">
                    <button class="btn bg-[#6320EE] hover:bg-[#5219d1] text-white border-none px-8 rounded-lg">Close</button>
                </form>
            </div>
        </div>
        <form method="dialog" class="modal-backdrop">
            <button>Close</button>
        </form>
    `;

    modal.showModal();
}

fetchCard();