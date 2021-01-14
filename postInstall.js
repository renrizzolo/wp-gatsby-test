const replace = require("replace-in-file")

const fixGatsbySourceWordPressExperimental = async () => {
  try {
    const results = await replace({
      files:
        "node_modules/gatsby-source-wordpress-experimental/dist/steps/create-schema-customization/transform-fields/transform-union.js",
      from: `else {
          return null;
        }`,
      to: ``,
    })

    console.log(results)
  } catch (e) {
    console.log(
      'error while trying to remove string "else { return null; }" from gatsby-source-wordpress-experimental',
      e
    )
  }
}

fixGatsbySourceWordPressExperimental()
