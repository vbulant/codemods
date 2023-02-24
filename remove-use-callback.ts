import type { FileInfo, API } from "jscodeshift"

// Run the mod
// node node_modules/.bin/jscodeshift -t ./codemods/remove-use-callback.ts --parser=tsx --extensions=ts,tsx path/to/files --print --dry

// Fix the output
// ./node_modules/.bin/prettier --write src

function removeCallExpressions(src, j) {
  src
    .find(j.CallExpression)
    .filter(path => path.value.callee.name === "useCallback")
    .forEach(path => {
      j(path).replaceWith(path.value.arguments[0])
    })
}

export default function removeUseCallbackTransformer(file: FileInfo, { jscodeshift: j }: API) {
  const src = j(file.source)

  removeCallExpressions(src, j)

  return src.toSource()
}
