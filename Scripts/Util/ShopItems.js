function loadShopItems(addShopItem,renderDiceSlots,drawCurrencyBox,addCurrency) {
    addShopItem("img/Dice Types/Split_num/Dice_Default.png", 10, () => {
        alert("Purchased Split Number Theme!");
        let diceChosen = prompt("Choose which die to apply the Split Number theme to (1-5):");
        //pressing cancel refunds money
        if(diceChosen === null) {
            addCurrency(10); // refund
            drawCurrencyBox();
            return;
        }
        if(isNaN(diceChosen)) {
            alert("Invalid input. Please enter a number between 1 and 5.");
            addCurrency(10); // refund
            drawCurrencyBox();
            return;
        }
        let dieIndex = parseInt(diceChosen);
        if(dieIndex >= 1 && dieIndex <= 5){
            storedData.specificDiceThemes[dieIndex] = "Split_num";
            storedData.storedSlotWeights[parseInt(dieIndex)] = 0; // reset any weight
            alert(`Applied Split Number theme to Die ${dieIndex}.`);
            renderDiceSlots();
        } else {
            alert("Invalid die number. Please enter a number between 1 and 5.");
            addCurrency(10); // refund
            drawCurrencyBox();
            return;
        }
    },{
        hotkey: true
    })
    addShopItem("img/Dice Types/Heavy_6/Dice_Default.png", 15, () => {
        alert("Purchased Heavy 6 Theme!");
        let diceChosen = prompt("Choose which slot to apply weight 6 to (1-5):");
        //pressing cancel refunds money
        if(diceChosen === null) {
            addCurrency(15); // refund
            drawCurrencyBox();
            return;
        }
        if(isNaN(diceChosen)) {
            alert("Invalid input. Please enter a number between 1 and 5.");
            addCurrency(15); // refund
            drawCurrencyBox();
            return;
        }
        let dieIndex = parseInt(diceChosen);
        storedData.storedSlotWeights[dieIndex] = 6;
        renderDiceSlots();
        alert(`Applied weight 6 to Slot ${dieIndex}.`);
    },{
        hotkey: true
    })
    addShopItem("img/Dice Types/Heavy_5/Dice_Default.png", 15, () => {
        alert("Purchased Heavy 5 Theme!");
        let diceChosen = prompt("Choose which slot to apply weight 5 to (1-5):");
        //pressing cancel refunds money
        if(diceChosen === null) {
            addCurrency(15); // refund
            drawCurrencyBox();
            return;
        }
        if(isNaN(diceChosen)) {
            alert("Invalid input. Please enter a number between 1 and 5.");
            addCurrency(15); // refund
            drawCurrencyBox();
            return;
        }
        let dieIndex = parseInt(diceChosen);
        storedData.storedSlotWeights[dieIndex] = 5;
        renderDiceSlots();
        alert(`Applied weight 5 to Slot ${dieIndex}.`);
    },{
        hotkey: true
    })
    addShopItem("img/Dice Types/Heavy_4/Dice_Default.png", 15, () => {
        alert("Purchased Heavy 4 Theme!");
        let diceChosen = prompt("Choose which slot to apply weight 4 to (1-5):");
        //pressing cancel refunds money
        if(diceChosen === null) {
            addCurrency(15); // refund
            drawCurrencyBox();
            return;
        }
        if(isNaN(diceChosen)) {
            alert("Invalid input. Please enter a number between 1 and 5.");
            addCurrency(15); // refund
            drawCurrencyBox();
            return;
        }
        let dieIndex = parseInt(diceChosen);
        storedData.storedSlotWeights[dieIndex] = 4;
        renderDiceSlots();
        alert(`Applied weight 4 to Slot ${dieIndex}.`);
    },{
        hotkey: true
    })
    addShopItem("img/Dice Types/Heavy_3/Dice_Default.png", 15, () => {
        alert("Purchased Heavy 3 Theme!");
        let diceChosen = prompt("Choose which slot to apply weight 3 to (1-5):");
        //pressing cancel refunds money
        if(diceChosen === null) {
            addCurrency(15); // refund
            drawCurrencyBox();
            return;
        }
        if(isNaN(diceChosen)) {
            alert("Invalid input. Please enter a number between 1 and 5.");
            addCurrency(15); // refund
            drawCurrencyBox();
            return;
        }
        let dieIndex = parseInt(diceChosen);
        storedData.storedSlotWeights[dieIndex] = 3;
        renderDiceSlots();
        alert(`Applied weight 3 to Slot ${dieIndex}.`);
    },{
        hotkey: true
    })
    addShopItem("img/Dice Types/Heavy_2/Dice_Default.png", 15, () => {
        alert("Purchased Heavy 2 Theme!");
        let diceChosen = prompt("Choose which slot to apply weight 2 to (1-5):");
        //pressing cancel refunds money
        if(diceChosen === null) {
            addCurrency(15); // refund
            drawCurrencyBox();
            return;
        }
        if(isNaN(diceChosen)) {
            alert("Invalid input. Please enter a number between 1 and 5.");
            addCurrency(15); // refund
            drawCurrencyBox();
            return;
        }
        let dieIndex = parseInt(diceChosen);
        storedData.storedSlotWeights[dieIndex] = 2;
        renderDiceSlots();
        alert(`Applied weight 2 to Slot ${dieIndex}.`);
    },{
        hotkey: true
    })
    addShopItem("img/Dice Types/Heavy_1/Dice_Default.png", 15, () => {
        alert("Purchased Heavy 1 Theme!");
        let diceChosen = prompt("Choose which slot to apply weight 1 to (1-5):");
        //pressing cancel refunds money
        if(diceChosen === null) {
            addCurrency(15); // refund
            drawCurrencyBox();
            return;
        }
        if(isNaN(diceChosen)) {
            alert("Invalid input. Please enter a number between 1 and 5.");
            addCurrency(15); // refund
            drawCurrencyBox();
            return;
        }
        let dieIndex = parseInt(diceChosen);
        storedData.storedSlotWeights[dieIndex] = 1;
        renderDiceSlots();
        alert(`Applied weight 1 to Slot ${dieIndex}.`);
    },{
        hotkey: true
    })
    addShopItem("img/Dice Types/Varience/Dice_Default.png", 30, () => {
        alert("Purchased Varient Theme!");
        let diceChosen = prompt("Choose which die to apply the Varient theme to (1-5):");
        //pressing cancel refunds money
        if(diceChosen === null) {
            addCurrency(30); // refund
            drawCurrencyBox();
            return;
        }
        if(isNaN(diceChosen)) {
            alert("Invalid input. Please enter a number between 1 and 5.");
            addCurrency(30); // refund
            drawCurrencyBox();
            return;
        }
        let dieIndex = parseInt(diceChosen);
        if(dieIndex >= 1 && dieIndex <= 5){
            storedData.specificDiceThemes[dieIndex] = "Varience";
            storedData.storedSlotWeights[parseInt(dieIndex)] = 0; // reset any weight
            alert(`Applied Varient theme to Die ${dieIndex}.`);
            renderDiceSlots();
        } else {
            alert("Invalid die number. Please enter a number between 1 and 5.");
            addCurrency(30); // refund
            drawCurrencyBox();
            return;
        }
    },{
        hotkey: true
    });
    
    addShopItem("img/Dice Types/Normal/Dice_Default.png", 1, () => {
        alert("Purchased Normal Theme!");
        let diceChosen = prompt("Choose which die to apply the Normal theme to (1-5):");
        //pressing cancel refunds money
        if(diceChosen === null) {
            addCurrency(1); // refund
            drawCurrencyBox();
            return;
        }
        if(isNaN(diceChosen)) {
            alert("Invalid input. Please enter a number between 1 and 5.");
            addCurrency(1); // refund
            drawCurrencyBox();
            return;
        }
        let dieIndex = parseInt(diceChosen);
        if(dieIndex >= 1 && dieIndex <= 5){
            storedData.specificDiceThemes[dieIndex] = "Normal";
            storedData.storedSlotWeights[parseInt(dieIndex)] = 0; // reset any weight
            alert(`Applied Normal theme to Die ${dieIndex}.`);
            renderDiceSlots();
        } else {
            alert("Invalid die number. Please enter a number between 1 and 5.");
            addCurrency(1); // refund
            drawCurrencyBox();
            return;
        }
    },{
        hotkey: true
    });

    addShopItem("img/Dice Types/Wildcard/Dice_Default.png", 20, () => {
        alert("Purchased Wildcard Theme!");
        let diceChosen = prompt("Choose which die to apply the Wildcard theme to (1-5):");
        //pressing cancel refunds money
        if(diceChosen === null) {
            addCurrency(20); // refund
            drawCurrencyBox();
            return;
        }
        if(isNaN(diceChosen)) {
            alert("Invalid input. Please enter a number between 1 and 5.");
            addCurrency(20); // refund
            drawCurrencyBox();
            return;
        }
        let dieIndex = parseInt(diceChosen);
        if(dieIndex >= 1 && dieIndex <= 5){
            storedData.specificDiceThemes[dieIndex] = "Wildcard";
            storedData.storedSlotWeights[parseInt(dieIndex)] = 0; // reset any weight
            alert(`Applied Wildcard theme to Die ${dieIndex}.`);
            renderDiceSlots();
        } else {
            alert("Invalid die number. Please enter a number between 1 and 5.");
            addCurrency(20); // refund
            drawCurrencyBox();
            return;
        }
    },{
        hotkey: true
    });

    addShopItem("img/Dice Types/Bonus/Dice_Default.png", 5, () => {
        alert("Purchased Bonus Theme!");
        let diceChosen = prompt("Choose which die to apply the Bonus theme to (1-5):");
        //pressing cancel refunds money
        if(diceChosen === null) {
            addCurrency(5); // refund
            drawCurrencyBox();
            return;
        }
        if(isNaN(diceChosen)) {
            alert("Invalid input. Please enter a number between 1 and 5.");
            addCurrency(5); // refund
            drawCurrencyBox();
            return;
        }
        let dieIndex = parseInt(diceChosen);
        if(dieIndex >= 1 && dieIndex <= 5){
            storedData.specificDiceThemes[dieIndex] = "Bonus";
            storedData.storedSlotWeights[parseInt(dieIndex)] = 0; // reset any weight
            alert(`Applied Bonus theme to Die ${dieIndex}.`);
            renderDiceSlots();
        } else {
            alert("Invalid die number. Please enter a number between 1 and 5.");
            addCurrency(5); // refund
            drawCurrencyBox();
            return;
        }
    },{
        hotkey: true
    });
}