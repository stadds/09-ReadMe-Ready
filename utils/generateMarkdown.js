function generateMarkdown(data) {
  return `
# ${data.title}

## Description
${data.description}


## Table of Contents

[Installation](#installation) \n
[Usage](#usage) \n
[License](#license) \n
[Badges](#badges) \n
[Contributing](#contributing) \n
[Tests](#tests) \n
[Questions](#questions) \n

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
