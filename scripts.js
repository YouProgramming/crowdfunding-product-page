const overlayElement = document.querySelector(".overlay-element");
const navbarToggler = document.querySelector(".navbar-toggler");
const toggleIcon = document.querySelector(".navbar-toggler img");
const modalElement = document.querySelector(".modal-element");
const closeModal = document.querySelector(".close-modal");
const backThisBrojectBtn = document.querySelector(".back-project");
const checkboxes = document.querySelectorAll(".custom-radio-checkbox");
const continueBtns = document.querySelectorAll(".continue-btn");
const gotItBtn = document.querySelector(".got-it-btn");
const selectReward = document.querySelectorAll(".select-reward");

// Change Navebar Toggler Icon And Display Overlay 
let isNavVisible = false;
navbarToggler.addEventListener("click", () => {
    if(isNavVisible){
        overlayElement.style.display = "none";
        isNavVisible = false;
    }else{
        overlayElement.style.display = "block";
        isNavVisible = true;
    }
    overlayElement.classList.toggle("overlay");

    const containes = overlayElement.classList.contains('overlay');
    if(window.matchMedia('(max-width: 991px)').matches && containes){
        toggleIcon.src = "images/icon-close-menu.svg";
    }else{
        toggleIcon.src = "images/icon-hamburger.svg";
    }
});
// Display Modal
backThisBrojectBtn.addEventListener("click",() => {
    closeAllPledges();
    modalElement.classList.toggle("d-none");
    if(isNavVisible){
        overlayElement.style.display = "none";
        isNavVisible = false;
    }else{
        overlayElement.style.display = "block";
        isNavVisible = true;
    }
    overlayElement.classList.toggle("overlay");
});
selectReward.forEach(e => {
    e.addEventListener("click", () => {
        closeAllPledges();
        modalElement.classList.toggle("d-none");
        if(isNavVisible){
            overlayElement.style.display = "none";
            isNavVisible = false;
        }else{
            overlayElement.style.display = "block";
            isNavVisible = true;
        }
        overlayElement.classList.toggle("overlay");
        displayPledge(e);
    })
})
function displayPledge(e){
    closeAllPledges();
    const pledgElementID = e.getAttribute("data-pledge-target");
    const pledge = document.getElementById(pledgElementID);
    if(pledge.classList.contains("d-none")){
        pledge.classList.remove("d-none");
        e.checked = true;
    }
}
// Hide Modal
closeModal.addEventListener("click",() => {
    modalElement.classList.toggle("d-none");
    if(isNavVisible){
        overlayElement.style.display = "none";
        isNavVisible = false;
    }else{
        overlayElement.style.display = "block";
        isNavVisible = true;
    }
    overlayElement.classList.toggle("overlay");
});
// Display Pledge
checkboxes.forEach((e) => {
    e.addEventListener("click", () => {
        closeAllPledges();
        const pledgElementID = e.getAttribute("data-pledge-target");
        const pledge = document.getElementById(pledgElementID);
        if(pledge.classList.contains("d-none")){
            pledge.classList.remove("d-none");
            e.checked = true;
        }
    });
})
function closeAllPledges(){
    removeCheckedMark();
    const allPledges = document.querySelectorAll(".pledge");
    allPledges.forEach((e) => {
        if(!e.classList.contains("d-none")){
            e.classList.add("d-none");
        }else{
           
        }
    }) 
}
function removeCheckedMark(){
    checkboxes.forEach(e => {
        if(e.checked){
            e.checked = false;
        }
    })
}
// Change Bookmark Backcolor
document.querySelector('.bookmark').addEventListener("click",() => {
    document.querySelector(".bookmark").classList.toggle("bookmarked");
});
// Validate Pledge Amount
function validatePledgeAmount(){
    continueBtns.forEach(e => {
        e.addEventListener("click", () => {
           const minAmount = Number(e.getAttribute("data-min-value"));
           const inpuElement = document.getElementById(minAmount);
           validateAmount(minAmount, inpuElement);
        })
    })
}
function validateAmount(amount, inpuElement){
    const inputValue = inpuElement.value;
    if(inputValue < amount || inputValue === ""){
        displayErrorMessageOrHideIt(inpuElement, true);
    }else{
        displayErrorMessageOrHideIt(inpuElement, false);
        displayThankYouOrHideIt(true);
        updateTotals(inpuElement.value)
    }
}
function displayErrorMessageOrHideIt(inpuElement, displayOrHide){
    const parent = inpuElement.parentElement;
    if(displayOrHide){
        parent.classList.add("errorMessage");
        inpuElement.style.borderColor = "red !important";
    }else{
        parent.classList.remove("errorMessage");
        inpuElement.style.borderColor = "hsl(0deg 0% 78.78%)";
    }
}
// Thank You Message
gotItBtn.addEventListener("click", () => {
    displayThankYouOrHideIt(false);
});
function displayThankYouOrHideIt(dislayOrHide){
    if(dislayOrHide){
        modalElement.classList.add("d-none");
        document.querySelector(".thank-you-message").classList.remove("d-none");
    }else{
        document.querySelector(".thank-you-message").classList.add("d-none");
        document.querySelector(".overlay-element").classList.remove("overlay")
    }
}
validatePledgeAmount();
// Update Totals
function updateTotals(amount){
    const backed = document.getElementById("total-backed");
    const backers = document.getElementById("total-backers");

    let totalBaked = Number(backed.getAttribute("data-backed"));
    let totalBakers = Number(backers.getAttribute("data-backers"));

    totalBaked += Number(amount);
    totalBakers += 1;

    let formatedTotalBaked = formatCurrency(totalBaked);
// formatedTotalBaked.toString().slice(0, -3)
    backed.textContent = "$" + totalBaked.toString().slice(0,2) + "," + totalBaked.toString().slice(2);
    backers.textContent = totalBakers.toString().slice(0,1) + "," + totalBakers.toString().slice(1);
}
function formatCurrency(amount) {
    // Round the amount to the nearest whole number
    const roundedAmount = Math.round(amount);
    
    // Format the number as currency
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(roundedAmount);
}

