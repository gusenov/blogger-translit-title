version=$(jq --raw-output '.version' manifest.json)
newVersion=$(./increment_version.sh $version)
jq ".version = \"$newVersion\"" manifest.json | sponge manifest.json

release="BloggerTranslitTitle-$newVersion.zip"

if [ ! -f $release ]; then
    :
else
    rm $release
fi

zip --quiet -r $release \
                "images/icon16.png" \
                "images/icon32.png" \
                "images/icon48.png" \
                "images/icon128.png" \
                "manifest.json" \
                "translit.js"

echo $release
