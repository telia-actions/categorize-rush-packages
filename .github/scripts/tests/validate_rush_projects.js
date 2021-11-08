module.exports = (core, projectsString, requiredValues) => {
  console.log('Checking category projects');
  const projects = JSON.parse(projectsString);
  if (projects.length <= 0) core.setFailed('Projects should not be empty')
  requiredValues.forEach(requiredValue => {
    if (projects.some(project => project.packageName === requiredValue) === false) {
      core.setFailed(`Projects does not include required value - ${requiredValue}`);
    }
  });
  console.log('Expected projects received');
}
