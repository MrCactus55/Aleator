let rerollCost = 5;
document.addEventListener("keydown", event => {
    console.log(event)
    if(event.key=="Tab") {
        event.preventDefault();
        if(true == true) {
            console.log("Tab pressed - switching button focus")
            console.log(tssel)
            if(tssel == 1) document.getElementById("startGameBtn").focus();
            if(tssel == 2) document.getElementById("resetGameDataBtn").focus();
            tssel++;
            if(tssel > 2) tssel = 1;
        }
    }
    if(event.key == 'Escape') {
        exitShop()
    }
    if((event.key == 'r' || event.key == 'R') && shop_state == true) {
        if(currency < rerollCost){
            alert("Insufficient funds to reroll shop items.");
            return;
        }
        addCurrency(-rerollCost);
        rerollCost += 5; // increase cost for next reroll
        reopenShop();
    }
    if(shop_state == true) return;
    if(event.key == '1') {
         if(selected[0]){
                delete selected[0];
                // remove outline around dice by redrawing a background-colored stroke
                for(let j = 0; j < 100; j++) {
                ctx.strokeStyle = "#3f3f46";
                ctx.lineWidth = 2;
                ctx.strokeRect(canvas.width / 2 - 166 + 0 * 70 -2.5, 47.5 + offsetY, 68, 68);
                }
            } else {
                selected[0] = true;
                ctx.strokeStyle = "#8a0e1c";
                ctx.lineWidth = 2;
                ctx.strokeRect(canvas.width / 2 - 166 + 0 * 70 -2.5, 47.5 + offsetY, 68, 68);
            }
    }
    if(event.key == '2') {
        if(selected[1]){
                delete selected[1];
                // remove outline around dice by redrawing a background-colored stroke
                for(let j = 0; j < 100; j++) {
                ctx.strokeStyle = "#3f3f46";
                ctx.lineWidth = 2;
                ctx.strokeRect(canvas.width / 2 - 166 + 1 * 70 -2.5, 47.5 + offsetY, 68, 68);
                }
            } else {
                selected[1] = true;
                ctx.strokeStyle = "#8a0e1c";
                ctx.lineWidth = 2;
                ctx.strokeRect(canvas.width / 2 - 166 + 1 * 70 -2.5, 47.5 + offsetY, 68, 68);
            }
    }
    if(event.key == '3') {
        if(selected[2]){
                delete selected[2];
                // remove outline around dice by redrawing a background-colored stroke
                for(let j = 0; j < 100; j++) {
                ctx.strokeStyle = "#3f3f46";
                ctx.lineWidth = 2;
                ctx.strokeRect(canvas.width / 2 - 166 + 2 * 70 -2.5, 47.5 + offsetY, 68, 68);
                }
            } else {
                selected[2] = true;
                ctx.strokeStyle = "#8a0e1c";
                ctx.lineWidth = 2;
                ctx.strokeRect(canvas.width / 2 - 166 + 2 * 70 -2.5, 47.5 + offsetY, 68, 68);
            }
    }
    if(event.key == '4') {
        if(selected[3]){
                delete selected[3];
                // remove outline around dice by redrawing a background-colored stroke
                for(let j = 0; j < 100; j++) {
                ctx.strokeStyle = "#3f3f46";
                ctx.lineWidth = 2;
                ctx.strokeRect(canvas.width / 2 - 166 + 3 * 70 -2.5, 47.5 + offsetY, 68, 68);
                }
            } else {
                selected[3] = true;
                ctx.strokeStyle = "#8a0e1c";
                ctx.lineWidth = 2;
                ctx.strokeRect(canvas.width / 2 - 166 + 3 * 70 -2.5, 47.5 + offsetY, 68, 68);
            }
    }
    if(event.key == '5') {
        if(selected[4]){
                delete selected[4];
                // remove outline around dice by redrawing a background-colored stroke
                for(let j = 0; j < 100; j++) {
                ctx.strokeStyle = "#3f3f46";
                ctx.lineWidth = 2;
                ctx.strokeRect(canvas.width / 2 - 166 + 4 * 70 -2.5, 47.5 + offsetY, 68, 68);
                }
            } else {
                selected[4] = true;
                ctx.strokeStyle = "#8a0e1c";
                ctx.lineWidth = 2;
                ctx.strokeRect(canvas.width / 2 - 166 + 4 * 70 -2.5, 47.5 + offsetY, 68, 68);
            }
    }
    if((event.key == 'r' || event.key == 'R') && shop_state == false) {
        roll_dice();
    }
});
// Detect button click: map a canvas click to any defined button's rectangle and run it
canvas.addEventListener('click', function(event) {
    let rect = canvas.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top
    buttons.forEach(btn => {
        if (x >= btn.position.x && x <= btn.position.x + 64 &&
            y >= btn.position.y && y <= btn.position.y + 64) {
                if(storedData.inputEnabled != true) return; 
            btn.run();
        }
    })
    // shop exit button
    if(shop_state == true){
        if (x >= window.innerWidth / 2 - 64 && x <= window.innerWidth / 2 + 64 &&
            y >= window.innerHeight - 150 && y <= window.innerHeight - 150 + 64) {
                exitShop();
        }

        // shop reroll button
        // window.innerWidth / 2 - 64+12, window.innerHeight - 400, 110, 110
        if (x >= window.innerWidth / 2 - 64+12 && x <= window.innerWidth / 2 - 64+12 + 110 &&
            y >= window.innerHeight - 400 && y <= window.innerHeight - 400 + 110) {
                if(currency < rerollCost){
                    alert("Insufficient funds to reroll shop items.");
                    return;
                }
                addCurrency(-rerollCost);
                rerollCost += 5; // increase cost for next reroll
                reopenShop();
        }
    }
})
// Detect dice clicks: allow holding/releasing dice when a round is active
canvas.addEventListener('click', function(event) {
    let rect = canvas.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;
    
    if(storedData.gameState != true) return; // ignore clicks when not in a round
    if(shop_state == true) return;
    for(let i = 0; i < 5; i++){
        if(x >= canvas.width / 2 - 166 + i * 70 && x <= canvas.width / 2 - 166 + i * 70 + 64 &&
           y >= 50 + offsetY && y <= 50 + 64 + offsetY){
            // Toggle selection for the clicked die
            if(selected[i]){
                delete selected[i];
                // remove outline around dice by redrawing a background-colored stroke
                for(let j = 0; j < 100; j++) {
                ctx.strokeStyle = "#3f3f46";
                ctx.lineWidth = 2;
                ctx.strokeRect(canvas.width / 2 - 166 + i * 70 -2.5, 47.5 + offsetY, 68, 68);
                }
            } else {
                selected[i] = true;
                ctx.strokeStyle = "#8a0e1c";
                ctx.lineWidth = 2;
                ctx.strokeRect(canvas.width / 2 - 166 + i * 70 -2.5, 47.5 + offsetY, 68, 68);
            }
        }
    }
})

let consoleMessages = [
    "=======================================",
    " ",
    "If you cheat you only cheat yourself.",
    "So why not just play fair and have fun?",
    " ",
    "======================================="
]

console.log(consoleMessages.join("\n"))