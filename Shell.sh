#grep exclude some directories:
	grep "/users" -r --exclude-dir=node_modules ./*
	grep "/users" -r --exclude-dir={node_modules,routes} ./*
