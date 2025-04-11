// const { GPU } = require("gpu.js"); // install gpu.js
const os = require("node:os");
const { fork } = require("node:child_process");

function burnCPU() {
	while (true) {
		for (let i = 0; i < 1e6; i++) {
			Math.sqrt(Math.random() * Math.random());
		}
	}
}

function burnRAM() {
	const data = [];
	while (true) {
		// Allocate 500MB chunks repeatedly
		data.push(new Array(5e7).fill("RAM STRESS"));
	}
}

// function burnGPU() {
// 	const gpu = new GPU();
// 	const kernel = gpu
// 		.createKernel(() => {
// 			let sum = 0;
// 			for (let i = 0; i < 1e5; i++) {
// 				sum += Math.tan(i);
// 			}
// 			return sum;
// 		})
// 		.setOutput([1000]);

// 	setInterval(() => kernel(), 5); // Hit GPU every 5ms
// }

// Fork CPU workers
const numCPUs = os.cpus().length;
if (!process.argv[2]) {
	for (let i = 0; i < numCPUs * 2; i++) {
		fork(__filename, ["cpu"]);
	}

	// Fork RAM workers
	for (let i = 0; i < 4; i++) {
		fork(__filename, ["ram"]);
	}

	// Fork GPU workers
	for (let i = 0; i < 2; i++) {
		fork(__filename, ["gpu"]);
	}
}
const burn = () => {
	console.log("Script started\n press ctrl/cmnd + c to stop  \n burning your cpu...")
	if (process.argv[2] === "cpu") burnCPU();
	if (process.argv[2] === "ram") burnRAM();
	// if (process.argv[2] === "gpu") burnGPU();
};

burn()

// wait for few seconds
