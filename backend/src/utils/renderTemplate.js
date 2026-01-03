export const renderTemplate = (content, variables) => {
  let rendered = content;

  Object.keys(variables).forEach((key) => {
    const regex = new RegExp(`{{${key}}}`, "g");
    rendered = rendered.replace(regex, variables[key]);
  });

  return rendered;
};
