install:
	npm ci

brain-games:
	npm run-script gendiff

publish:
	npm publish --dry-run

lint:
	npx eslint .