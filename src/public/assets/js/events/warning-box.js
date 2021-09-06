// show warning box
function showWarningBox(text, type) {
    resetWarningBox();
    // add new class
    idwarningbox.classList.add("warning-box");
    idwarningbox.classList.add(type);

    // add new text
    idwarningbox.innerHTML = text;
}

function resetWarningBox() {
    // reset class
    idwarningbox.classList.remove("fail"); 
    idwarningbox.classList.remove("success"); 
    idwarningbox.classList.remove("warning-box"); 
    idwarningbox.innerHTML = "";
}