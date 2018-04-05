# https://gist.github.com/DarrenN/8c6a5b969481725a4413#gistcomment-2089309
PACKAGE_VERSION=$(node -p "require('./package.json').version")


# https://stackoverflow.com/questions/3474526/stop-on-first-error
gulp build || exit 1
