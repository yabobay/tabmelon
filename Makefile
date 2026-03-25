All: bundle.js

bundle.js: melon.js node_modules
	rollup --config rollup-config.js

node_modules:
	npm i
