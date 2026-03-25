let pendingDelELs = [];

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
        ctx.drawImage(img, x + (w - img.width) / 2, y + 20);
      }
      text(`$${price.toFixed(2)}`, x + w / 2, y + h - 80, 24, "#ffffff", "center");
      drawBtn("Buy", x + (w - 64) / 2, y + h - 50, 64, 32, callback);
    }
    // ---------- background ----------
    rect(0, 0, canvas.width, canvas.height, "#3f3f46")
    // ---------- left shop panel ----------
    const leftX = 40;
    const leftY = 60;
    const leftW = 220;
    const leftH = 780
    rect(leftX, leftY, leftW, leftH, "#4b4b52", "#e58aa0", 4)
    // SHOP title
    text("SHOP", leftX + leftW / 2, 2, 64, "#facc15", "center")
    // Dice label
    rect(leftX + 20, leftY + 20, leftW - 40, 50, "#2f2f34");
    text("Dice", leftX + leftW / 2, leftY + 30, 32, "#ffffff", "center")
    // Dice slots
    function renderDiceSlots() {
        let slotY = leftY + 100;
        for (let i = 0; i < 5; i++) {
        rect(leftX + 55, slotY, leftW - 110, 110, "#3a3a40");
        drawDice(0, leftX + 62.5, slotY + 7, 1.5, i + 1);
        slotY += 120;
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
        rect(canvas.width - 260, 20, 220, 50, "#5b5b61");
        text(`Currency: ${cDisplay}`, canvas.width - 150, 30, 24, "#ffffff", "center");
    }
    renderDiceSlots();
    drawCurrencyBox()
    // ---------- main center panel ----------
    const centerX = leftX + leftW + 40;
    const centerY = 80;
    const centerW = 1320;
    const centerH = 720
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
      const itemsPerRow = 5;
      const itemWidth = 200;
      const itemHeight = 250;
      const padding = 40;
      let startX = centerX + 80;
      let startY = centerY + 40
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
    // Shop Item Renderin
    loadShopItems(addShopItem,renderDiceSlots,drawCurrencyBox,addCurrency);


    renderShopItems();
    // Exit button
    drawBtn("Exit", window.innerWidth / 2 - 64, window.innerHeight - 150, 128, 64);
    //Shop Reroll Button
    drawBtn("ShopRoll", window.innerWidth / 2 - 64+12, window.innerHeight - 400, 110, 110);
    setTimeout(() => {
        text(`${rerollCost}`, window.innerWidth / 2 - 64+12+55, window.innerHeight - 400+50, 16, "#ffffff", "center");
    },150)

    // ---------- right panel ----------
    const rightW = 220;
    const rightX = centerX + centerW + 40
    rect(canvas.width - 260, centerY, rightW, centerH, "#4b4b52", "#a78bfa", 4);

}