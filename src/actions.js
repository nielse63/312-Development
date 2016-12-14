
export function addTitle(text) {
  return {
    type: 'ADD_TITLE',
    text,
  }
}

export function addDescription(text) {
  return {
    type: 'ADD_DESCRIPTION',
    text,
  }
}
