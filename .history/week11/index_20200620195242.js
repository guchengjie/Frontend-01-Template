function init(el) {
	addCells(el)
	fillAllCell(el)
}

function addCells(el) {
	let fragment = document.createDocumentFragment()

	for (let i = 1; i <= SIZE; i++) {
		let cell = document.createElement('span')
		cell.classList.add('cell')
		fragment.appendChild(cell)
	}

	el.appendChild(fragment)
}

function fillAllCell(el) {
	let cellsEl = el.children

	for (let i = 0; i < SIZE; i++) {
		if (boardData[i] === 1) {
			cellsEl[i].style.backgroundColor = 'black'
		}
	}
}

function fillCurCell(e) {
	if (e.target.nodeName === 'SPAN') {
		const index = Array.from(e.target.parentElement.children).indexOf(e.target)
		if (curStuff === 1) {
			// 填充
			if (boardData[index] === 0) {
				boardData[index] = 1
				e.target.style.backgroundColor = 'black'
			}
		} else if (curStuff === 0) {
			// 擦除
			if (boardData[index] === 1) {
				boardData[index] = 0
				e.target.style.backgroundColor = 'lightgray'
			}
		}
	}
}

/********** begin *************/
const SIZE = 10000
let boardData = localStorage.board
	? JSON.parse(localStorage.board)
	: new Array(SIZE).fill(0)
let curStuff = 1 // 0：橡皮擦，1：画笔

const canvas = document.getElementById('canvas')
canvas.addEventListener('mousedown', e => {
	// 1：鼠标左键，2：鼠标右键
	if (e.buttons === 1) curStuff = 1
	else if (e.buttons === 2) curStuff = 0

	canvas.addEventListener('mouseover', fillCurCell)
	canvas.addEventListener('mouseup', () => {
		canvas.removeEventListener('mouseover', fillCurCell)
	})
})
// 阻止右键菜单弹出
canvas.addEventListener('contextmenu', e => {
	e.preventDefault()
})
document.body.addEventListener('mouseup', () => {
	canvas.removeEventListener('mouseover', fillCurCell)
})

const saveBtn = document.getElementById('save')
const prompt = document.getElementById('prompt')
saveBtn.addEventListener('click', () => {
	try {
		localStorage.board = JSON.stringify(boardData)
		prompt.textContent = '保存成功'
	} catch (e) {
		prompt.textContent = '保存失败'
	}

	setTimeout(() => {
		prompt.textContent = ''
	}, 1000);
});

function sleep(timeout) {
	return new Promise((resolve) => {
		setTimeout(resolve, timeout);
	})
}

async function findPath(map, start, end) {
	let queue = [start];
	map = map.slice();

	async function insert([x, y]) {
		if (map[100 * y + x] !== 0) {
			return;
		}
		if (x < 0 || y < 0 || x >= 100 || y >= 100) {
			return;
		}
		map[100 * y + x] = 2;
		queue.push(x, y);
	}

	while(queue.length) {
		const [x, y] = queue.shift();
		if (x === end[0] && y === end[1]) {
			let path = [];
			while(x !== start[0] || y !== start[1]) {
				path.push([x, y]);
				container.children[y * 100 + x].start.backgroundColor = 'pink';
				[x, y] = map[y * 100 + x];
			}
			return path;
		}
		insert([x - 1, y], [x, y]);
		insert([x + 1, y], [x, y]);
		insert([x, y - 1], [x, y]);
		insert([x, y + 1], [x, y]);
		return null;
	}
}

init(canvas)
