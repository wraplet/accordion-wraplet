export const makeNestableSelectorFromAttribute = (
  itemAttribute: string,
  attribute: string,
) =>
  `:scope [${attribute}]:not(:scope [${itemAttribute}] [${itemAttribute}] [${attribute}])`;

export const mainAttribute = "data-js-wraplet-accordion";
export const itemAttribute = `${mainAttribute}--item`;
