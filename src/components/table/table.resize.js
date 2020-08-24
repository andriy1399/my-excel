import { $ } from '../../core/dom';

export function resizeHandler($root, event) {
    const $resizer = $(event.target);
    const $parent = $resizer.closest('[data-type="resizable"]');
    const coords = $parent.getCoords();
    const type = event.target.dataset.resize;
    const sideProp = type === 'col' ? 'bottom' : 'right';
    let value;
    $resizer.css({
        opacity: 1,
        [sideProp]: '-4000px',
    });
    document.onmousemove = e => {
        if (type === 'col') {
            const delta = e.clientX - coords.right;
            value = coords.width + delta;
            $resizer.css({ right: -delta + 'px' });
        } else {
            const delta = e.clientY - coords.bottom;
            value = coords.height + delta;
            $resizer.css({ bottom: -delta + 'px' });
        }
    };
    document.onmouseup = () => {
        document.onmousemove = 0;
        document.onmouseup = 0;
        if (type === 'col') {
            const dataCol = `[data-col="${$parent.data.col}"]`;
            const cells = $root.findAll(dataCol);
            $parent.css({ width: value + 'px', userSelect: 'none' });
            cells.forEach(el => el.style.width = value + 'px');
        } else {
            $parent.css({ height: value + 'px', userSelect: 'none' });
        }
        $resizer.css({
            opacity: 0,
            bottom: 0,
            right: 0,
        });
    };
}
