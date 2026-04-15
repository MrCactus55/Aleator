function exitShop() {
    shop_state = false;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setTimeout(() => {draw_board()}, 150);
}

function reopenShop() {
    cachedShopItems = []; // Clear cache to generate new items on reroll
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    draw_shop();
}