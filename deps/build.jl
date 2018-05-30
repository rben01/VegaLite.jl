using NodeJS
using Compat

run(Cmd(`$(npm_cmd()) install --production --no-bin-links --no-package-lock --no-optional`, dir=@__DIR__))
