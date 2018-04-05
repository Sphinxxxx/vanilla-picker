# https://gist.github.com/DarrenN/8c6a5b969481725a4413#gistcomment-2089309
PACKAGE_VERSION=$(node -p "require('./package.json').version")


# https://stackoverflow.com/questions/18544359/how-to-read-user-input-into-a-variable-in-bash
read -p "v$PACKAGE_VERSION - push to git? Enter commit/tag message (leave blank to cancel): " commit

# https://stackoverflow.com/questions/6482377/check-existence-of-input-argument-in-a-bash-shell-script
if [ ! -z "$commit" ]
  then
    # echo "$commit"

    git add -A
    git commit -am "$commit"
    # https://stackoverflow.com/questions/11514075/what-is-the-difference-between-an-annotated-and-unannotated-tag
    # https://stackoverflow.com/questions/35221147/what-is-the-sequence-for-tagging-commit-in-git
    git tag -a "v$PACKAGE_VERSION" -m "$commit"
    git push --follow-tags
fi
