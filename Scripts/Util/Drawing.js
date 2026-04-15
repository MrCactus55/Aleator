/**
 * drawBtn
 * - Draws a button image at the requested x/y. `value` maps to an image file name.
 */
function drawBtn(value, x, y, width = 64, height = 64, callback) {
    let BtnFN = ``
    BtnFN = `img/btn_${value}.png`;
    let img = new Image();
    img.src = BtnFN;
    img.onload = function() {
        // Only draw if game is still active (prevents drawing after state changes)
        if(typeof gameStarted !== 'undefined' && gameStarted === true) {
            ctx.drawImage(img, x, y, width, height);
        }
    }
    if(callback) {
        document.addEventListener('click', function(event) {
            let rect = canvas.getBoundingClientRect();
            let clickX = event.clientX - rect.left;
            let clickY = event.clientY - rect.top;
            if (clickX >= x && clickX <= x + width &&
                clickY >= y && clickY <= y + height) {
                callback();
            }
        });
    }
}