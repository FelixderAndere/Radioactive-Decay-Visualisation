const XLSX = require("xlsx");
const { DecaySimulator } = require("../webapp/decay.js");
const { SUBSTANCE_PRESETS } = require("../webapp/presets.js");

function benchmark(
    outputFile = "decay_test.xlsx",
    particleCount = 800
) {
    const preset = SUBSTANCE_PRESETS.demo;

    const maxTime = 0.01;
    const repetitions = 80000;
    const dt = 0.0005;

    const workbook = XLSX.utils.book_new();
    const rows = [];

    rows.push([
        "Run",
        ...Object.keys(preset.substances)
    ]);

    for (let run = 1; run <= repetitions; run++) {

        const simulator = new DecaySimulator(
            preset.substances,
            { particleCount }
        );

        let t = 0;

        while (t < maxTime) {
            const step = Math.min(dt, maxTime - t);
            simulator.simulate(step);
            t += step;
        }

        rows.push([
            run,
            ...simulator.values
        ]);
    }

    const sheet = XLSX.utils.aoa_to_sheet(rows);
    XLSX.utils.book_append_sheet(workbook, sheet, "dt=1");
    XLSX.writeFile(workbook, outputFile);

    console.log(`Excel geschrieben: ${outputFile}`);
}

benchmark("decay_dist_test.xlsx", 5000);

module.exports = { benchmark };
