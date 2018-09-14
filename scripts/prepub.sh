# https://gist.github.com/DarrenN/8c6a5b969481725a4413#gistcomment-2089309
PACKAGE_VERSION=$(node -p "require('./package.json').version")


# See if CHANGELOG.md is updated (if applicable)
FILE=CHANGELOG.md
NEEDLE="[$PACKAGE_VERSION]"
echo "Searching for $NEEDLE in $FILE:"

# https://stackoverflow.com/questions/638975/how-do-i-tell-if-a-regular-file-does-not-exist-in-bash
if  [ -f $FILE ]
then
    # https://stackoverflow.com/questions/4749330/how-to-test-if-string-exists-in-file-with-bash
    if  grep -Fq "$NEEDLE" $FILE
    then
        echo "  $FILE updated."
    else
        echo -e "\e[31m  $FILE not updated!\e[0m"
        exit 2
    fi
else
    # https://superuser.com/questions/332223/echo-text-in-a-certain-color-in-a-shell-script
    echo -e "\e[33m  $FILE not found. Continuing...\e[0m"
fi


# https://stackoverflow.com/questions/3474526/stop-on-first-error
gulp build || exit 1
