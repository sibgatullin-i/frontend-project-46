install:
	npm ci

gendiff-help:
	node gendiff.js -h

publish:
	npm publish --dry-run

test:
	npm test

test-coverage:
	npm test -- --coverage --coverageProvider=v8

lint:
	npx eslint .

run:
	node gendiff.js '__fixtures__/nested1.json' '__fixtures__/nested2.json'

.PHONY: test