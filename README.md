# Commit Message Writer

#### A VSCode Extension which helps you write your commits optional with Conventional Commits.  


---

### Prerequisites:
- Node.js
- npm
- git
- VSCode
- Optional: Github desktop

## Configuration
### Clone the repository:
 ```bash
 git clone git@github.com:schakamaier/commit-message-writer.git
 ```
### install dependencies
```bash
npm install
```
## Development
### Compile the extension
```bash
npm run compile
```
### Watch for changes and compile automtically:
```bash
npm run watch
```
### Run the Extension:
- open the Run and debug view via the sidebar (or press ⌘ ⇧ D / strg ⇧ D)
- in the window at Run, select the extension.ts file or another file you wnat to debug

## Features
* [ ] Git integration
* [ ] LLM Connection
* [ ] UI
* [ ] Commit Generation

## Branches
- ### feat/git-integration
    Branch for Git integration and getting the changes  
    ```bash
    # Switch to feat/git-integration: 
    git fetch origin
    git checkout feat/git-integration
    ```

---

- ### feat/llm-integration
    Branch for llm integra- and connection
    ```bash
    # Switch to feat/llm-integration: 
    git fetch origin
    git checkout feat/llm-integration
    ```

---

- ### feat/commit-generation
    Branch for commit Genration. 
    ```bash
    # Switch to feat/commit-generation: 
    git fetch origin
    git checkout feat/commit-generation
    ```
---

- ### feat/settings-UI
    Branch for UI, Settings and integration in VSCode
    ```bash
    # Switch to feat/settings-UI: 
    git fetch origin
    git checkout feat/settings-UI
    ```

## Commits
 This Repo uses Conventional Commits
### Syntax:
```
<type><optional scope>: <description>
<Optional body>
<optional footer>
```
### Exapmle:
```
feat(UI): add user interface
add UI which contains buttons inputs and more. 
Ref #30
```
