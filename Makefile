install: install-deps

start:
	heroku local -f Procfile.dev

start-backend:
	npm start --watch --verbose-watch

start-frontend:
	npx webpack serve

install-deps:
	npm ci

build:
	npm run build

lint:
	npx eslint . --ext js,jsx

fix:
	npx eslint . --ext js,jsx --fix

publish:
	npm publish

deploy:
	git push heroku

test:
	npm test -s

.PHONY: test
