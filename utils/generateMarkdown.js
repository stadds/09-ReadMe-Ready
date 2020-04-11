function generateMarkdown(data) {
  return `
# ${data.title}

## Description
${data.description}


## Table of Contents

[Installation](#installation)
[Usage](#usage)
[License](#license)
[Badges](#badges)
[Contributing](#contributing)
[Tests](#tests)
[Questions](#questions)

---
## Installation
${data.installation}

---
## Usage
${data.usage}

---
## License
${data.license}

---
## Badges
${data.badges}

---
## Contributing
${data.contributing}

---
## Tests
${data.tests}

---
## Questions
${data.questions}

### Contact Me
![](${data.avatar_url})

* email:  ${data.email}
`
}

module.exports = {generateMarkdown:generateMarkdown};
