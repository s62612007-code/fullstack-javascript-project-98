
install:
	npm ci

setup:
	npm ci
	chmod +x bin/*.js

brain-games:
	node bin/brain-games.js

brain-even:
	node bin/brain-even.js

brain-calc:
	node bin/brain-calc.js

brain-gcd:
	node bin/brain-gcd.js

brain-progression:
	node bin/brain-progression.js

brain-prime:
	node bin/brain-prime.js

link:
	npm link

.PHONY: install setup brain-games brain-even brain-calc brain-gcd brain-progression brain-prime link

test-smoke:
	node scripts/smoke.js

test: test-smoke
