function toggleInput(checkboxNum) {
    var input = document.getElementById("input"+checkboxNum);
    var checkbox = document.getElementById("checkbox"+checkboxNum);

    if(checkbox.checked){
        input.disabled = false;
        switch(checkboxNum){
            case 1:
                input.placeholder = "Enter Youtube Handle";
                input.value = "@";
                break;
            case 2:
                input.placeholder = "Enter Twitch Username";
                break;
            case 3:
                input.placeholder = "Enter Twitter Handle";
                input.value = "@";
                break;
            case 4:
                input.placeholder = "Enter TikTok Handle";
                input.value = "@";
                break;
        }
        // input.removeAttribute("disabled");
    }
    else{
        input.disabled = true;
        input.placeholder = "";
        input.value = "";
        // input.setAttribute("disabled", '');
    }

}

