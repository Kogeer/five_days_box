DC = docker-compose

install:
	$(DC) run --rm frontend bash -c "npm install"
	$(DC) run --rm backend bash -c "npm install"

start:
	$(DC) up

exec-backend:
	$(DC) exec backend bash

exec-frontend:
	$(DC) exec frontend bash

test-frontend:
	$(DC) run --rm frontend bash -c "npm test"

test-backend:
	$(DC) run --rm backend bash -c "npm test"
