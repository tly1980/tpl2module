LIB=./lib
BIN=./bin
TEST=./test

all: lib/tpl2module.js bin/tpl2module

bump: 
	bumpversion -p -s -x c
	cp VERSION.json $(LIB)/.
	
bin/tpl2module: $(LIB)/*.coffee 
	coffee -o $(BIN) -c $(BIN)
	echo "#!/usr/bin/env node\n" > $(BIN)/tpl2module
	cat $(BIN)/main.js >> $(BIN)/tpl2module
	chmod u+x $(BIN)/tpl2module

lib/tpl2module.js: $(BIN)/*.coffee $(TEST)/*.coffee
	coffee -o $(LIB) -c $(LIB)
	coffee -o $(TEST) -c $(TEST)

test: lib/tpl2module.js bin/tpl2module
	mocha

clean:
	rm -f $(LIB)/*.js
	rm -f $(BIN)/*.js
	rm -f $(BIN)/tpl2module

.PHONY: bump clean test