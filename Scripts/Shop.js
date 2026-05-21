let pendingDelELs = [];
let cachedShopItems = []; // Cache shop items to prevent reroll on resize

let globalValues = {
  rerollx: 0,
  rerolly: 0,
  rerollw: 0,
  rerollh: 0,
  exitx: 0,
  exity: 0,
  exitw: 0,
  exith: 0
}

setTimeout(() => {
  canvas.addEventListener('click', function(event) {
    if(shop_state != true) return;
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    if (mouseX >= globalValues.rerollx && mouseX <= globalValues.rerollx + globalValues.rerollw &&
        mouseY >= globalValues.rerolly && mouseY <= globalValues.rerolly + globalValues.rerollh) {
            if(currency < rerollCost){
                alert("Insufficient funds to reroll shop items.");
                return;
            }
            addCurrency(-rerollCost);
            rerollCost += 5; // increase cost for next reroll
            reopenShop();
    }

    if (mouseX >= globalValues.exitx && mouseX <= globalValues.exitx + globalValues.exitw &&
      mouseY >= globalValues.exity && mouseY <= globalValues.exity + globalValues.exith) {
        console.log("Exiting shop...");
          exitShop();
          // reset rolls if <0
          if(storedData.rolls < 0) storedData.rolls = 3;
          if(window.localStorage.getItem("storedData")) window.localStorage.setItem("storedData", JSON.stringify(storedData));
  }
});
},150)


function draw_shop(){
    // clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    shop_state = true;

    // clear pending delete event listeners
    pendingDelELs.forEach(el => {
        document.removeEventListener(el.type, el.cb);
    });
    pendingDelELs = [];
    // Draw shop interface here 
    // ---------- helpers ----------
    function rect(x, y, w, h, fill, stroke = null, lineWidth = 2) {
      ctx.fillStyle = fill;
      ctx.fillRect(x, y, w, h);
    
      if (stroke) {
        ctx.strokeStyle = stroke;
        ctx.lineWidth = lineWidth;
        ctx.strokeRect(x, y, w, h);
      }
    }
    function text(txt, x, y, size = 32, color = "#fff", align = "left") {
      ctx.fillStyle = color;
      ctx.font = `${size}px sans-serif`;
      ctx.textAlign = align;
      ctx.textBaseline = "top";
      ctx.fillText(txt, x, y);
    }
    function addCenterBuyItem(x, y, w, h, imgSrc, price, callback = null) {
      rect(x, y, w, h, "#2f2f34");
      let img = new Image();
      img.src = imgSrc;
      img.onload = function() {
        // Only draw if we're still in the shop
        if(shop_state === true) {
          let scale = Math.min(1, (w - 20) / img.width);
          ctx.drawImage(img, x + (w - img.width * scale) / 2, y + 20, img.width * scale, img.height * scale);
        }
      }
      text(`$${price.toFixed(2)}`, x + w / 2, y + h - 80, Math.max(12, canvas.width * 0.0132), "#ffffff", "center");
      const btnW = Math.max(40, w * 0.5);
      const btnH = Math.min(32, btnW * 0.5);
      drawBtn("Buy", x + (w - btnW) / 2, y + h - btnH - 10, btnW, btnH, callback);
    }
    // ---------- background ----------
    rect(0, 0, canvas.width, canvas.height, "#3f3f46")
    // ---------- left shop panel ----------
    const leftX = canvas.width * 0.022;
    const leftY = canvas.height * 0.06;
    const leftW = canvas.width * 0.12;
    const leftH = canvas.height * 0.78;
    rect(leftX, leftY, leftW, leftH, "#4b4b52", "#e58aa0", 4)
    // SHOP title
    text("SHOP", leftX + leftW / 2, 2, Math.max(32, canvas.width * 0.035), "#facc15", "center")
    // Dice label
    const diceLabelTextSize = Math.max(16, canvas.width * 0.018);
    const diceLabelBoxH = diceLabelTextSize + 16;
    const diceLabelBoxW = leftW * 0.85;
    const diceLabelBoxX = leftX + leftW * 0.075;
    rect(diceLabelBoxX, leftY + 20, diceLabelBoxW, diceLabelBoxH, "#2f2f34");
    text("Dice", leftX + leftW / 2, leftY + 20 + diceLabelBoxH / 2 - diceLabelTextSize / 2, diceLabelTextSize, "#ffffff", "center")
    // Dice slots
    function renderDiceSlots() {
        let slotY = leftY + canvas.height * 0.1;
        const diceBoxPadding = leftW * 0.15;
        const diceBoxW = leftW - diceBoxPadding * 2;
        const diceBoxH = Math.max(40, leftH * 0.08);
        const diceBoxX = leftX + diceBoxPadding;
        const diceScale = Math.min(diceBoxW, diceBoxH) / 64 * 0.8;
        const dicePixelSize = 64 * diceScale;
        for (let i = 0; i < 5; i++) {
        rect(diceBoxX, slotY, diceBoxW, diceBoxH, "#3a3a40");
        // Center dice in box
        const diceCenterX = diceBoxX + diceBoxW / 2 - dicePixelSize / 2;
        const diceCenterY = slotY + diceBoxH / 2 - dicePixelSize / 2;
        drawDice(0, diceCenterX, diceCenterY, diceScale, i + 1);
        slotY += diceBoxH * 1.3;
        }
    }
    function drawCurrencyBox() {
        // make like "k" for thousand "m" for million etc
        let placeValueRemoved = 0;
        let twodp = "";
        let cDisplay = "";
        if(currency >= 1e9){
            placeValueRemoved = 12;
            let fullTXT = "$"+currency.toFixed(2).toString();
            fullTXT = fullTXT.replace(`$${currency.toFixed(2).toString().slice(0,currency.toFixed(2).toString().length-placeValueRemoved)}`,"");
            twodp = fullTXT.slice(0,2)
            cDisplay = `$${currency.toFixed(2).toString().slice(0,currency.toFixed(2).toString().length-placeValueRemoved)}.${twodp}b`;
        } else if(currency >= 1e6){
            placeValueRemoved = 9;
            let fullTXT = "$"+currency.toFixed(2).toString();
            fullTXT = fullTXT.replace(`$${currency.toFixed(2).toString().slice(0,currency.toFixed(2).toString().length-placeValueRemoved)}`,"");
            twodp = fullTXT.slice(0,2)
            cDisplay = `$${currency.toFixed(2).toString().slice(0,currency.toFixed(2).toString().length-placeValueRemoved)}.${twodp}m`;
        } else if(currency >= 1e3){
            placeValueRemoved = 6;
            let fullTXT = "$"+currency.toFixed(2).toString();
            fullTXT = fullTXT.replace(`$${currency.toFixed(2).toString().slice(0,currency.toFixed(2).toString().length-placeValueRemoved)}`,"");
            twodp = fullTXT.slice(0,2)
            cDisplay = `$${currency.toFixed(2).toString().slice(0,currency.toFixed(2).toString().length-placeValueRemoved)}.${twodp}k`;
        } else {
            placeValueRemoved = 0;
            twodp = "";
            cDisplay = `$${currency.toFixed(2)}`;
        }
        const currBoxW = canvas.width * 0.14;
        const currBoxH = canvas.height * 0.05;
        const rightPanelX = canvas.width - canvas.width * 0.12 - 20;
        const currBoxX = rightPanelX - currBoxW - canvas.width * 0.01;
        rect(currBoxX, 5, currBoxW, currBoxH, "#5b5b61");
        text(cDisplay, currBoxX + currBoxW / 2, 5 + currBoxH / 2, Math.max(8, canvas.width * 0.009), "#ffffff", "center");
    }
    renderDiceSlots();
    // ---------- main center panel ----------
    const centerX = leftX + leftW + canvas.width * 0.022;
    const centerY = leftY;
    const centerW = canvas.width - leftW - (canvas.width * 0.022 * 3) - (canvas.width * 0.12);
    const centerH = canvas.height - leftY - (canvas.height * 0.1);
    rect(centerX, centerY, centerW, centerH, "#585861")
    let shop_items = [];
    function addShopItem(imgSrc, price, callback = null, meta = {}) {
        let ncb = () => {
            drawCurrencyBox();
            callback();
        };
      shop_items.push({ imgSrc, price, callback:ncb,meta });
    }
    function renderShopItems() {
      const itemsPerRow = Math.max(3, Math.floor((centerW - 80) / (canvas.width * 0.11)));
      const itemWidth = canvas.width * 0.11;
      const itemHeight = canvas.height * 0.25;
      const padding = canvas.width * 0.022;
      let startX = centerX + canvas.width * 0.044;
      let startY = centerY + canvas.height * 0.04;
      // Shop RNG
      shop_items = shop_items.sort(() => Math.random() - 0.5);
      shop_items = shop_items.slice(0, 10);

      shop_items.forEach((item, index) => {
        let meta = item.meta;
        console.log(item);
        let row = Math.floor(index / itemsPerRow);
        let col = index % itemsPerRow;
        let x = startX + col * (itemWidth + padding);
        let y = startY + row * (itemHeight + padding);
        // add to callback so only on shop
        let newCB = () => {
            if(shop_state != true) return;
            if(currency < item.price){
                alert("Insufficient funds to make this purchase.");
                return;
            }
            addCurrency(-item.price);
            item.callback();
        }
        if(meta.hotkey == true) meta.hotkey = `${index + 1}`;
      if(meta.hotkey.length == 2) meta.hotkey = meta.hotkey.slice(1);
      if(meta.hotkey) {
        let elCallback = event => {
            if(event.key == meta.hotkey) {
                if(shop_state == true) newCB();
            }
        }
        document.addEventListener("keydown", elCallback);
        pendingDelELs.push({type:"keydown",cb:elCallback});
      }
        addCenterBuyItem(x, y, itemWidth, itemHeight, item.imgSrc, item.price, newCB);
      });
    }
    // Shop Item Rendering
    // Only generate new items if cache is empty
    if (cachedShopItems.length === 0) {
        loadShopItems(addShopItem,renderDiceSlots,drawCurrencyBox,addCurrency);
    } else {
        // Use cached items instead of generating new ones
        cachedShopItems.forEach(item => {
            addShopItem(item.imgSrc, item.price, item.callback, item.meta);
        });
    }

    renderShopItems();
    
    // Calculate number of rows
    const itemsPerRow = Math.max(3, Math.floor((centerW - 80) / (canvas.width * 0.11)));
    const numRows = Math.ceil(shop_items.length / itemsPerRow);
    console.log(`Items per row: ${itemsPerRow}, Number of rows: ${numRows}`);
    
    // Shop Reroll Button
    let rerollBtnX;
    const rerollBtnW = Math.max(70, canvas.width * 0.065);
    const rerollBtnH = Math.max(70, canvas.height * 0.10);
    const rerollBtnY = canvas.height - rerollBtnH * 3.5;
    if(numRows > 2) {
      rerollBtnX = (canvas.width / 2 - rerollBtnW / 2) + 50;
    }else {
      rerollBtnX = canvas.width / 2 - rerollBtnW / 2;
    }
    globalValues.rerollx = rerollBtnX;
    globalValues.rerolly = rerollBtnY;
    globalValues.rerollw = rerollBtnW;
    globalValues.rerollh = rerollBtnH;

    drawBtn("ShopRoll",rerollBtnX, rerollBtnY, rerollBtnW, rerollBtnH);
    setTimeout(() => {
        text(`${rerollCost}`, rerollBtnX + 35, rerollBtnY + rerollBtnH / 2, Math.max(12, canvas.width * 0.012), "#ffffff", "center");
    },150)
    
    // Exit button
    let exitBtnX;
    const exitBtnW = Math.max(80, canvas.width * 0.085);
    const exitBtnH = Math.max(40, canvas.height * 0.055);
    const exitBtnY = canvas.height - exitBtnH - 100;
    if(numRows > 2) {
      exitBtnX = (canvas.width / 2 - exitBtnW / 2) + 50;
    }else {
      exitBtnX = canvas.width / 2 - exitBtnW / 2;
    }

    globalValues.exitx = exitBtnX;
    globalValues.exity = exitBtnY;
    globalValues.exitw = exitBtnW;
    globalValues.exith = exitBtnH;
    drawBtn("Exit", exitBtnX, exitBtnY, exitBtnW, exitBtnH);

    // ---------- right panel ----------
    const rightW = canvas.width * 0.12;
    const rightX = centerX + centerW + canvas.width * 0.022;
    rect(canvas.width - rightW - 20, centerY, rightW, centerH, "#4b4b52", "#a78bfa", 4);
    
    // Cache the generated shop items for future redraws
    if (cachedShopItems.length === 0 && shop_items.length > 0) {
        cachedShopItems = shop_items.map(item => ({
            imgSrc: item.imgSrc,
            price: item.price,
            callback: item.callback,
            meta: item.meta
        }));
    }
    
    // Draw currency box last so it appears on top
    drawCurrencyBox();
}

// Redraw shop on resize without regenerating items
function redraw_shop(){
    // clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    shop_state = true;

    // ---------- helpers ----------
    function rect(x, y, w, h, fill, stroke = null, lineWidth = 2) {
      ctx.fillStyle = fill;
      ctx.fillRect(x, y, w, h);
    
      if (stroke) {
        ctx.strokeStyle = stroke;
        ctx.lineWidth = lineWidth;
        ctx.strokeRect(x, y, w, h);
      }
    }
    function text(txt, x, y, size = 32, color = "#fff", align = "left") {
      ctx.fillStyle = color;
      ctx.font = `${size}px sans-serif`;
      ctx.textAlign = align;
      ctx.textBaseline = "top";
      ctx.fillText(txt, x, y);
    }
    function addCenterBuyItem(x, y, w, h, imgSrc, price, callback = null) {
      rect(x, y, w, h, "#2f2f34");
      let img = new Image();
      img.src = imgSrc;
      img.onload = function() {
        // Only draw if we're still in the shop
        if(shop_state === true) {
          let scale = Math.min(1, (w - 20) / img.width);
          ctx.drawImage(img, x + (w - img.width * scale) / 2, y + 20, img.width * scale, img.height * scale);
        }
      }
      text(`$${price.toFixed(2)}`, x + w / 2, y + h - 80, Math.max(12, canvas.width * 0.0132), "#ffffff", "center");
      const btnW = Math.max(40, w * 0.5);
      const btnH = Math.min(32, btnW * 0.5);
      drawBtn("Buy", x + (w - btnW) / 2, y + h - btnH - 10, btnW, btnH, callback);
    }
    function drawCurrencyBox() {
        // make like "k" for thousand "m" for million etc
        let placeValueRemoved = 0;
        let twodp = "";
        let cDisplay = "";
        if(currency >= 1e9){
            placeValueRemoved = 12;
            let fullTXT = "$"+currency.toFixed(2).toString();
            fullTXT = fullTXT.replace(`$${currency.toFixed(2).toString().slice(0,currency.toFixed(2).toString().length-placeValueRemoved)}`,"");
            twodp = fullTXT.slice(0,2)
            cDisplay = `$${currency.toFixed(2).toString().slice(0,currency.toFixed(2).toString().length-placeValueRemoved)}.${twodp}b`;
        } else if(currency >= 1e6){
            placeValueRemoved = 9;
            let fullTXT = "$"+currency.toFixed(2).toString();
            fullTXT = fullTXT.replace(`$${currency.toFixed(2).toString().slice(0,currency.toFixed(2).toString().length-placeValueRemoved)}`,"");
            twodp = fullTXT.slice(0,2)
            cDisplay = `$${currency.toFixed(2).toString().slice(0,currency.toFixed(2).toString().length-placeValueRemoved)}.${twodp}m`;
        } else if(currency >= 1e3){
            placeValueRemoved = 6;
            let fullTXT = "$"+currency.toFixed(2).toString();
            fullTXT = fullTXT.replace(`$${currency.toFixed(2).toString().slice(0,currency.toFixed(2).toString().length-placeValueRemoved)}`,"");
            twodp = fullTXT.slice(0,2)
            cDisplay = `$${currency.toFixed(2).toString().slice(0,currency.toFixed(2).toString().length-placeValueRemoved)}.${twodp}k`;
        } else {
            placeValueRemoved = 0;
            twodp = "";
            cDisplay = `$${currency.toFixed(2)}`;
        }
        const currBoxW = canvas.width * 0.14;
        const currBoxH = canvas.height * 0.05;
        const rightPanelX = canvas.width - canvas.width * 0.12 - 20;
        const currBoxX = rightPanelX - currBoxW - canvas.width * 0.01;
        rect(currBoxX, 5, currBoxW, currBoxH, "#5b5b61");
        text(cDisplay, currBoxX + currBoxW / 2, 5 + currBoxH / 2, Math.max(8, canvas.width * 0.009), "#ffffff", "center");
    }
    
    // ---------- background ----------
    rect(0, 0, canvas.width, canvas.height, "#3f3f46")
    // ---------- left shop panel ----------
    const leftX = canvas.width * 0.022;
    const leftY = canvas.height * 0.06;
    const leftW = canvas.width * 0.12;
    const leftH = canvas.height * 0.78;
    rect(leftX, leftY, leftW, leftH, "#4b4b52", "#e58aa0", 4)
    // SHOP title
    text("SHOP", leftX + leftW / 2, 2, Math.max(32, canvas.width * 0.035), "#facc15", "center")
    // Dice label
    const diceLabelTextSize2 = Math.max(16, canvas.width * 0.018);
    const diceLabelBoxH2 = diceLabelTextSize2 + 16;
    const diceLabelBoxW2 = leftW * 0.85;
    const diceLabelBoxX2 = leftX + leftW * 0.075;
    rect(diceLabelBoxX2, leftY + 20, diceLabelBoxW2, diceLabelBoxH2, "#2f2f34");
    text("Dice", leftX + leftW / 2, leftY + 20 + diceLabelBoxH2 / 2 - diceLabelTextSize2 / 2, diceLabelTextSize2, "#ffffff", "center")
    // Dice slots
    function renderDiceSlots() {
        let slotY = leftY + canvas.height * 0.1;
        const diceBoxPadding = leftW * 0.15;
        const diceBoxW = leftW - diceBoxPadding * 2;
        const diceBoxH = Math.max(40, leftH * 0.08);
        const diceBoxX = leftX + diceBoxPadding;
        const diceScale = Math.min(diceBoxW, diceBoxH) / 64 * 0.8;
        const dicePixelSize = 64 * diceScale;
        for (let i = 0; i < 5; i++) {
        rect(diceBoxX, slotY, diceBoxW, diceBoxH, "#3a3a40");
        // Center dice in box
        const diceCenterX = diceBoxX + diceBoxW / 2 - dicePixelSize / 2;
        const diceCenterY = slotY + diceBoxH / 2 - dicePixelSize / 2;
        drawDice(0, diceCenterX, diceCenterY, diceScale, i + 1);
        slotY += diceBoxH * 1.3;
        }
    }
    renderDiceSlots();
    // ---------- main center panel ----------
    const centerX = leftX + leftW + canvas.width * 0.022;
    const centerY = leftY;
    const centerW = canvas.width - leftW - (canvas.width * 0.022 * 3) - (canvas.width * 0.12);
    const centerH = canvas.height - leftY - (canvas.height * 0.1);
    rect(centerX, centerY, centerW, centerH, "#585861")
    
    // Redraw cached items with new positioning
    function renderShopItems() {
      const itemsPerRow = Math.max(3, Math.floor((centerW - 80) / (canvas.width * 0.11)));
      const itemWidth = canvas.width * 0.11;
      const itemHeight = canvas.height * 0.25;
      const padding = canvas.width * 0.022;
      let startX = centerX + canvas.width * 0.044;
      let startY = centerY + canvas.height * 0.04;

      cachedShopItems.forEach((item, index) => {
        let row = Math.floor(index / itemsPerRow);
        let col = index % itemsPerRow;
        let x = startX + col * (itemWidth + padding);
        let y = startY + row * (itemHeight + padding);
        addCenterBuyItem(x, y, itemWidth, itemHeight, item.imgSrc, item.price, item.callback);
      });
    }
    
    renderShopItems();
    
    // Calculate number of rows
    const itemsPerRow = Math.max(3, Math.floor((centerW - 80) / (canvas.width * 0.11)));
    const numRows = Math.ceil(cachedShopItems.length / itemsPerRow);
    console.log(`Items per row: ${itemsPerRow}, Number of rows: ${numRows}`);
    
    // Shop Reroll Button
    const rerollBtnW = Math.max(70, canvas.width * 0.065);
    const rerollBtnH = Math.max(70, canvas.height * 0.10);
    const rerollBtnY = canvas.height - rerollBtnH * 3.5;
    if(numRows > 2) {
      rerollBtnX = (canvas.width / 2 - rerollBtnW / 2) + 50;
    }else {
      rerollBtnX = canvas.width / 2 - rerollBtnW / 2;
    }
    drawBtn("ShopRoll",rerollBtnX, rerollBtnY, rerollBtnW, rerollBtnH);
    setTimeout(() => {
        text(`${rerollCost}`, rerollBtnX + 35, rerollBtnY + rerollBtnH / 2, Math.max(12, canvas.width * 0.012), "#ffffff", "center");
    },150)
    
    globalValues.rerollx = rerollBtnX;
    globalValues.rerolly = rerollBtnY;
    globalValues.rerollw = rerollBtnW;
    globalValues.rerollh = rerollBtnH;

    // Exit button
    const exitBtnW = Math.max(80, canvas.width * 0.085);
    const exitBtnH = Math.max(40, canvas.height * 0.055);
    const exitBtnY = canvas.height - exitBtnH - 100;
    if(numRows > 2) {
      exitBtnX = (canvas.width / 2 - exitBtnW / 2) + 50;
    }else {
      exitBtnX = canvas.width / 2 - exitBtnW / 2;
    }
    drawBtn("Exit", exitBtnX, exitBtnY, exitBtnW, exitBtnH);
    globalValues.exitx = exitBtnX;
    globalValues.exity = exitBtnY;
    globalValues.exitw = exitBtnW;
    globalValues.exith = exitBtnH;
    // ---------- right panel ----------
    const rightW = canvas.width * 0.12;
    const rightX = centerX + centerW + canvas.width * 0.022;
    rect(canvas.width - rightW - 20, centerY, rightW, centerH, "#4b4b52", "#a78bfa", 4);
    
    // Draw currency box last so it appears on top
    drawCurrencyBox();
}