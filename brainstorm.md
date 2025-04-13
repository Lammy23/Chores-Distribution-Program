Workflow for creating responsive styles

add the normal styles then add @media queries at the bottom.
Change all of them simultaneously

Instead of adding padding to each component, i styled the main-div
as a grid and added grid-gap, which is automatic spacing between
components

## Testing Strategy

- Unit Tests
- GUI Tests
- Integration Tests
- API Tests
- Coverage
- Mutation Testing
- Performance Testing (like jmeter)

## Static Analysis

- SonarQube (codesmells)

## Jenkins Stages

- Setup
- Build
- Push to DockerHub
- Deploy (on AWS eventually)