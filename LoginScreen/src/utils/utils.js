export const scrollToTop = () => {
  window.scrollTo(0, 0);
};

export const stripHtml_fun = (a) => {
  let stripedHtml = a.replace(/<[^>]+>/g, '');
  return stripedHtml;
}

export const stripInlineStyles = (a) => {
  let stripedHtml = a?.replace(/style=('.*?')|(".*")|(\\".*\\")|(\\'.*\\')/ig, "");
  return stripedHtml;
}