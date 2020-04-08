function generateMarkdown(data) {
  return `
# ${data.title}

---
## Description

${data.description}

## Table of Contents


## Installation


## Usage


## License


## Contributing


## Tests


## Questions

`
}

module.exports = generateMarkdown;
