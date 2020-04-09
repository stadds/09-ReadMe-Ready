function generateMarkdown(data) {
  return `
# ${data.title}

## Description
${data.description}

---
## Table of Contents

[Installation](#installation)
[Usage](#usage)
[License](#license)
[Badges](#badges)
[Contributing](#contributing)
[Tests](#tests)
[Questions](#questions)


## Installation
${data.installation}

## Usage
${data.usage}


## License
${data.license}

## Badges


## Contributing
${data.contributing}

## Tests


## Questions
* ![](${data.avatar_url})
* ${data.email}
`
}

module.exports = {generateMarkdown:generateMarkdown};
