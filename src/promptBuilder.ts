const conventionalCommitInstructions = `
Follow the Conventional Commits specification.

Structure:
<type>(<scope>): <description>

Allowed types:
- feat: New features
- fix: Bug fixes
- docs: Documentation changes
- style: Formatting changes that don't affect code logic
- refactor: Code restructuring without changing functionality
- perf: Performance improvements
- test: Adding or modifying tests
- build: Build system or dependency changes
- ci: CI/CD configuration changes
- chore: Other maintenance tasks

Additional rules:
- Use lowercase types.
- Keep descriptions concise and imperative.
- Only include a scope when useful.
- Never invent changes.
`;

export function buildSystemPrompt(basePrompt: string, useConventionalCommits: boolean): string {
    if (useConventionalCommits) {
        return `${basePrompt}\n\n${conventionalCommitInstructions}`;
    }
    return basePrompt
}