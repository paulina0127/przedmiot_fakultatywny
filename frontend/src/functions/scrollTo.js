// Handle scroll to section
const scrollTo = (anchor) => () => {
  const id = `${anchor}`;
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }
};

export default scrollTo;
