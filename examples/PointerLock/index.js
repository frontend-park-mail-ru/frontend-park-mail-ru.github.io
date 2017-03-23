(function() {
	const canv = document.querySelector("canvas");
	const ctx = canv.getContext("2d");

	const CIRCLE_RAD = 32;

	let x = 50;
	let y = 50;

	function draw() {
		ctx.fillStyle = "#616161";
		ctx.fillRect(0, 0, canv.width, canv.height);

		ctx.beginPath();

		ctx.fillStyle = "#009688";
		ctx.arc(x, y, CIRCLE_RAD, 0, Math.PI*2, true);
		ctx.fill();
	}

	function updateCirclePosition(event) {
		x += event.movementX;
		y += event.movementY;

		if (x > canv.width + CIRCLE_RAD) {
			x = -CIRCLE_RAD;
		} else if (x < -CIRCLE_RAD) {
			x = canv.width + CIRCLE_RAD;
		}

		if (y > canv.height + CIRCLE_RAD) {
			y = -CIRCLE_RAD;
		} else if (y < -CIRCLE_RAD) {
			y = canv.height + CIRCLE_RAD;
		}

		requestAnimationFrame(draw);
	}

	function lockStatusChange() {
		if (document.pointerLockElement === canv){
			document.addEventListener("mousemove", updateCirclePosition);
		} else {
			document.removeEventListener("mousemove", updateCirclePosition);
		}
	}

	document.addEventListener('pointerlockchange', lockStatusChange);

	canv.onclick = canv.requestPointerLock;

	draw();
}());
