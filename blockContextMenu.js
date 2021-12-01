//block rightmouse + CtrlU
function blockContextMenu(){
	document.addEventListener('contextmenu', event => event.preventDefault());
	document.onkeydown = function(e) {
        if ((e.keyCode === 85 || e.keyCode === 117)) {//Alt+c, Alt+v will also be disabled sadly.
            console.log('Chặn!');
        }
        return false;
};
}
blockContextMenu()

//'e.ctrlKey &&' chặn Ctrl 
