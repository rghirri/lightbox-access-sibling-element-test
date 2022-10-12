// Create Elements
// The dialog
let parentBody = document.querySelector('body');
let siblingMain = document.querySelector('main');
let dialog = document.createElement("div");
dialog.classList.add('dialog');
dialog.setAttribute('Role', 'dialog');
dialog.setAttribute('aria-labelledby', 'dialog_title');
// dialog__window
let dialogWindow = document.createElement("div");
dialogWindow.classList.add('dialog__window');
// dialog heading
let dialogHeading = document.createElement("div");
dialogHeading.classList.add('dialog_heading');
// dialog heading header two
let headerTwo = document.createElement("h2");
headerTwo.classList.add("#dialog_title");
headerTwo.innerText = "Dialog Example";
// dialog content
let dialogContent = document.createElement("div");
dialogContent.classList.add("dialog_content");
// dialog content p
let dialogParagraph = document.createElement("p");
dialogParagraph.innerText = "This is a modal accessibility example.";
let buttonClose = document.createElement("button");
buttonClose.innerText = "Close";
let buttonOk = document.createElement("button");
buttonOk.innerText = "Ok";
let dialogMask = document.createElement("div");
dialogMask.classList.add("dialog__mask");

// append elements children
dialog.append(dialogWindow, dialogMask);
dialogWindow.append(dialogHeading, dialogContent);
dialogHeading.appendChild(headerTwo);
dialogContent.append(dialogParagraph, buttonClose, buttonOk);

// append main tag as sibling to dialog
if(siblingMain.nextSibling){
    siblingMain.parentNode.insertBefore(dialog,siblingMain.nextSibling);
  }else{
    siblingMain.parentNode.appendChild(dialog);
  }




// access modal
const KEYCODE = {
    ESC: 27
};
const open_modal_button = document.querySelector(".open_modal_button");

// const dialog = document.querySelector(".dialog");
// const dialogMask = dialog.querySelector(".dialog__mask");
// const dialogWindow = dialog.querySelector(".dialog__window");

let previousActiveElement;

// event
    // document.querySelector(".open_modal_button").addEventListener('click', () => {
    //     console.log('i am working');
    // });

    open_modal_button.addEventListener('click', openDialog);

// functions

function openDialog() {
    // console.log('i am working');
    /*previousActiveElement = document.activeElement;*/

    // Make all siblings of our dialog inert
    Array.from(document.body.children).forEach(child => {
        if (child !== dialog)
        child.inert = true;
    });

    dialog.classList.add("opened");
    
    // listen for things that should close the dialog
    dialogMask.addEventListener('click', closeDialog);
    dialogWindow.querySelectorAll('button').forEach(btn => {
        btn.addEventListener('click', closeDialog);
    });
    document.addEventListener('keydown', checkCloseDialog);

    // Finally, move focus to the dialog
    dialog.querySelector('button').focus(); 
}

function checkCloseDialog(e) {
    if (e.keyCode === KEYCODE.ESC) 
    closeDialog();
}

function closeDialog() {
    // clean up any event listeners.
    dialogMask.removeEventListener('click', closeDialog);
    dialogWindow.querySelectorAll('button').forEach(btn => {
        btn.removeEventListener('click', closeDialog);
    });
    document.removeEventListener('keydown', checkCloseDialog);

    //  uninert our siblings.
    Array.from(document.body.children).forEach(child => {
        if (child !== dialog) child.inert = false;
    });

    // Hide the dialog.
    dialog.classList.remove('opened');

    // Restore focus to the previous active element
    previousActiveElement.focus();
}
