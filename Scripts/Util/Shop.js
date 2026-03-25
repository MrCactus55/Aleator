function exitShop() {
    shop_state = false;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setTimeout(() => {draw_board()}, 150);
}

function reopenShop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    draw_shop();
}