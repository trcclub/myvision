function applyStylingToElementsArray(elementsArray, property, value) {
  for (let i = 0; i < elementsArray.length; i += 1) {
    elementsArray[i].style[property] = value;
  }
}

function applyLargeScreenButtonsStyle(buttonElements) {
  buttonElements.labellerModalSubmitButtonElement.style.paddingBottom = '4px';
  buttonElements.labellerModalCancelButtonElement.style.paddingBottom = '4px';
  applyStylingToElementsArray(buttonElements.buttonClassElements, 'lineHeight', 1.35);
  applyStylingToElementsArray(buttonElements.popupLabelButtonClassElements, 'paddingTop', '6px');
}

function applySmallScreenButtonsStyle(buttonElements, screenSizeDelta) {
  buttonElements.labellerModalSubmitButtonElement.style.paddingBottom = `${5 / screenSizeDelta}px`;
  buttonElements.labellerModalCancelButtonElement.style.paddingBottom = `${5 / screenSizeDelta}px`;
  applyStylingToElementsArray(buttonElements.buttonClassElements, 'lineHeight', 'initial');
  applyStylingToElementsArray(buttonElements.popupLabelButtonClassElements, 'paddingTop', `${7 / screenSizeDelta}px`);
}

function getButtonElements() {
  const buttons = {};
  buttons.labellerModalSubmitButtonElement = document.getElementById('labeller-modal-submit-button');
  buttons.labellerModalCancelButtonElement = document.getElementById('labeller-modal-cancel-button');
  buttons.buttonClassElements = document.getElementsByClassName('buttons');
  buttons.popupLabelButtonClassElements = document.getElementsByClassName('popup-label-button');
  return buttons;
}

function setButtonsStyle(screenSizeDelta) {
  const buttonElements = getButtonElements();
  if (screenSizeDelta > 1.000001) {
    applySmallScreenButtonsStyle(buttonElements, screenSizeDelta);
  } else {
    applyLargeScreenButtonsStyle(buttonElements, screenSizeDelta);
  }
}

export { setButtonsStyle as default };
