import { rollup } from "rollup";
import verify from "./index.js";
import test from "tape-await";

const outputOptions = {
  file: 'tmp/bundle.js',
  format: 'esm'
}

test("An unresolved export should raise an error", async t => {
  try {
    const inputOptions = {
      input: 'test-fixture/input-1.js',
      plugins: [verify({noExternals: true})],
    };
    const bundle = await rollup(inputOptions);

    // generate code
    const { output } = await bundle.generate(outputOptions);
    t.fail();
  } catch (e) {
    t.ok(/does-not-exist/.test(e), "Error matches unmet dependency") 
  }
});

test("No unresolved dependencies should not throw", async t => {
  const inputOptions = {
    input: 'test-fixture/input-2.js',
    plugins: [verify({noExternals: true})],
  };
  const bundle = await rollup(inputOptions);

  // generate code
  const { output } = await bundle.generate(outputOptions);

  t.pass("It worked");
});


