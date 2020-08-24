
const CODES = {
    A: 65,
    Z: 90,
};

function createCell(_, col) {
    return `<div class="cell" contenteditable data-col="${col}"></div>`;
}

function toColumn(col, index) {
    return `
        <div class="column" data-type="resizable" data-col="${index}">
            ${col}
            <div class="col-resize" data-resize="col"></div>
        </div>
    `;
}

function createRow(num, content) {
    const resize = num ?
        '<div class="row-resize" data-resize="row"></div>' : '';
    return `
        <div class="row" data-type="resizable">
            <div class="row-info" >
                ${num ? num : ''}
                ${resize}
            </div>
            <div class="row-data">${content}</div>
        </div>
    `;
}

function toChar(_, index) {
    return String.fromCharCode(CODES.A + index);
}
export function createTable(rowsCount = 15) {
    const colsCount = CODES.Z - CODES.A;
    const rows = [];

    const cols = new Array(colsCount + 1)
        .fill('')
        .map(toChar)
        .map(toColumn)
        .join('');

    const cells = new Array(colsCount + 1).fill('').map(createCell).join('');

    rows.push(createRow('', cols));
    for (let i = 0; i < rowsCount; i++) {
        rows.push(createRow(i + 1, cells));
    }
    return rows.join('');
}
