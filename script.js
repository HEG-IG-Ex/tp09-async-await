function promisify(name) {
	return new Promise((resolve, reject) => {
		// Délai de réponse entre 500 et 2000 ms
		const delai = 500 + Math.round(Math.random() * 1500);
		// Returns a random number:
		let x = Math.random();
		setTimeout(() => {
			if (x <= 0.8) {
				resolve(`success ! ${name}`);
			}else{
				reject(new Error(`${name} failed ! `));
			}
		}, delai);
	});
}

const a = () => promisify("a");
const b = () => promisify("b");
const c = () => promisify("c");

async function parallel() {
	//a().catch(e=> e), b().catch(e=> e), c().catch(e=> e)
	const promises = [a().catch(console.error), b().catch(console.error), c().catch(console.error)];
	const [output1, output2, output3] = await Promise.all(promises);
	return `parallel is done: ${output1} ${output2} ${output3}`;

}
async function sequence() {
	const output1 = await a().catch(console.error);
	const output2 = await b().catch(console.error);
	const output3 = await c().catch(console.error);
	return `sequence is done: ${output1} ${output2} ${output3}`;
}
async function race() {
	const promises = [a().catch(console.error), b().catch(console.error), c().catch(console.error)];
	const output1 = await Promise.race(promises)
	return `race is done: ${output1}`
}

sequence().then(console.log);
parallel().then(console.log);
race().then(console.log);


function deleteLastChild() {
	let list = document.querySelector("ul#list");
	lastItem = list.querySelector("li:last-child");

	if (lastItem != null) {
		let value = lastItem.innerHTML;
		list.removeChild(lastItem);
		return value;
	}

	return "";
}
function deleteLastChildRandomlyInTime(name) {
	return new Promise((resolve, reject) => {
		// Délai de réponse entre 500 et 2000 ms
		const delai = 500 + Math.round(Math.random() * 1500);
		// Returns a random number:
		let x = Math.random();
		setTimeout(() => {
			if (x <= 0.8) {
				let value = deleteLastChild();
				resolve(`success ! ${name} : ${value}`);
			}else{
				reject(new Error(`${name} failed ! `));
			}
		}, delai);
	});
}

const x = () => deleteLastChildRandomlyInTime("First");
const y = () => deleteLastChildRandomlyInTime("Second");
const z = () => deleteLastChildRandomlyInTime("Third");


async function clearList(){
	const output1 = await x().catch(console.error);;
	const output2 = await y().catch(console.error);;
	const output3 = await z().catch(console.error);;
	return `clearlist is done`;
}

clearList().then(console.log);