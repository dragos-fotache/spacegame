export function bindInput({ canvas, input, run, actions }) {
    window.addEventListener('keydown', e => {
        const k = e.key.toLowerCase();
        input.keys[k] = true;

        if (e.key === 'Escape' || k === 'p') {
            if (run.mode === 'PLAYING' || run.mode === 'PAUSED') {
                e.preventDefault();
                actions.togglePauseGame();
                return;
            }
        }

        if (run.mode === 'PLAYING') {
            if (e.key === '1') actions.useGear('magnet');
            if (e.key === '2') actions.useGear('shield');
            if (e.key === '3') actions.useGear('nova');
            if (e.key === '4') actions.useGear('repair');
        }
    });

    window.addEventListener('keyup', e => {
        input.keys[e.key.toLowerCase()] = false;
    });

    function handlePointerMove(clientX, clientY) {
        if (run.mode !== 'PLAYING') return;
        input.targetX = clientX;
        input.targetY = clientY;
    }

    canvas.addEventListener('mousedown', e => handlePointerMove(e.clientX, e.clientY));
    canvas.addEventListener('mousemove', e => {
        if (e.buttons === 1) handlePointerMove(e.clientX, e.clientY);
    });
    window.addEventListener('mouseup', () => {
        input.targetX = null;
        input.targetY = null;
    });

    canvas.addEventListener('touchstart', e => {
        if (e.touches.length > 0) {
            handlePointerMove(e.touches[0].clientX, e.touches[0].clientY);
        }
    }, { passive: true });

    canvas.addEventListener('touchmove', e => {
        if (e.touches.length > 0) {
            handlePointerMove(e.touches[0].clientX, e.touches[0].clientY);
        }
    }, { passive: true });

    canvas.addEventListener('touchend', () => {
        input.targetX = null;
        input.targetY = null;
    });
}
