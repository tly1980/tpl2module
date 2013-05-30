LIB=./lib
BIN=./bin
TEST=./test

all: bump exec 

VERSION.json:
	./bumpversion.coffee

bump: VERSION.json
	cp VERSION.json $(LIB)/.
	
js: bump
	coffee -o $(LIB) -c $(LIB)/tpl2js.coffee
	coffee -o $(BIN) -c $(BIN)/tpl2js.coffee
	coffee -o $(TEST) -c $(TEST)

exec: js
	mv $(BIN)/tpl2js.coffee $(BIN)/tpl2js

test: js
	mocha

clean:
	rm -f $(LIB)/*.js
	rm -f $(BIN)/*.js
	rm -f $(BIN)/tpl2js
	rm VERSION.json

.PHONY: bumpversion clean