const loadingSpinner = document.getElementById("loadingSpinner");
const cardContainer = document.getElementById("cardContainer");

async function fetchCard(){
    showLoading();
    cardContainer.innerHTML = "";
    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
    const data = await res.json();
    const cards = data.data;
    // console.log(card);
    hideLoading();

    displayCard(cards);


}

function displayCard(cards){
    cards.forEach(item => {
        const cardDiv = document.createElement("div");
        cardDiv.innerHTML = `
            <div class="card bg-base-100 h-full shadow-xl border border-gray-100 overflow-hidden">
                <div class="card-body p-5 gap-4 border-t-6 ${item.status == "open"?"border-green-500": "border-indigo-400" }">
                    <div class="flex justify-between items-center">
                        <div class="avatar placeholder">
                            <div>
                                <img src="${item.status == "open" ? "assets/Open-Status.png" : "assets/Closed-Status.png"}" alt="">
                            </div>
                        </div>
                        <span class="badge badge-error badge-outline 
                                ${item.priority === "medium" 
                                ? "bg-orange-100 text-orange-400" 
                                : item.priority === "low" 
                                ? "bg-indigo-100 text-indigo-400" 
                                : "bg-red-100 text-red-400"} 
                                font-bold py-3 px-6 border-none">
                                    ${item.priority}
                        </span>
                    </div>

                    <div>
                        <h2 class="card-title text-sm font-bold">
                            ${item.title}
                        </h2>
                        <p class="text-slate-500 text-xs mt-2 line-clamp-2">
                            ${item.description}
                        </p>
                    </div>

                    <div class="flex flex-wrap gap-2">
                        <div class="badge badge-outline border-red-200 text-red-400 gap-1 p-3 bg-red-100 text-[9px] uppercase font-semibold">
                            <span class="text-xs"></span> ${item.labels[0]}
                        </div>
                        <div
                            class="badge badge-outline ${item.labels[1] == undefined ? "border-none": "border-orange-200 text-orange-500 bg-orange-100"}  gap-1 p-3 uppercase font-semibold text-[9px]">
                            <span class="text-xs"></span> ${item.labels[1] == undefined ? "" : item.labels[1]}
                        </div>
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
}

function showLoading(){
    loadingSpinner.classList.remove("hidden");
    loadingSpinner.classList.add("block");
}

function hideLoading(){
    loadingSpinner.classList.remove("block");
    loadingSpinner.classList.add("hidden");
}

fetchCard();