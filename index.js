export function verify(opts) {

    return {
        name: 'verify-build', // this name will show up in warnings and errors
        /**
         * @param {any} _options
         * @param {import('rollup').OutputBundle} bundle
         */
        generateBundle(_options, bundle) {
            if (opts.noExternals) {
                const deps = new Set(Object.keys(bundle));
                const unknown = new Set();
                for (const output of Object.values(bundle)) {
                    if (bundle.type != 'chunk') continue;
                    if (!output.imports) continue;
                    for (const dep of output.imports) {
                        if (!deps.has(dep)) unknown.add(dep);
                    }
                }

                if (unknown.size) {
                    throw new Error(`Found unknown external reference(s) ${ [...unknown].map(e => `"${e}"`).join(", ") }`);
                }

            }
        }
    }
};

export default verify;