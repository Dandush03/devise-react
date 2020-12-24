function focusText(e) {
  const label = e.currentTarget;
  if (label.getElementsByTagName('input')[0]) {
    label.getElementsByTagName('input')[0].focus();
  } else {
    label.lastChild.focus();
  }
}

export default focusText;
