import {
  removeFile, replaceActiveAnnotationFileIfRemoving, getDatasetObject,
  getActiveAnnotationFile, updateImageFileErrorStatus,
} from '../datasetObjectManagers/VGGJSONDatasetObjectManager';
import {
  removeRow, changeAnnotationRowToDefault, disableFinishButton,
  insertRowToImagesTable, changeAllImagesTableRowsToDefault, enableFinishButton,
} from '../style';
import validateCOCOJSONFormat from '../formatValidators/VGGJSONValidator';
import {
  ONE_ANNOTATION_FILE_ALLOWED_ERROR_MESSAGE,
  VALID_ANNOTATION_FILES_ARRAY,
  FALTY_ANNOTATION_FILES_ARRAY,
  IMAGE_FILES_OBJECT,
} from '../../../consts';

// pontential to move this out into shared validate logic
// can't at the moment because validate is just one default function
function validateExistingImages(datasetObject) {
  let foundValid = false;
  Object.keys(datasetObject[IMAGE_FILES_OBJECT]).forEach((key) => {
    const imageFile = datasetObject[IMAGE_FILES_OBJECT][key];
    const validationResult = validateCOCOJSONFormat(imageFile);
    if (!validationResult.error) { foundValid = true; }
    const { name } = imageFile.body.fileMetaData;
    insertRowToImagesTable(name, validationResult);
    updateImageFileErrorStatus(name, validationResult.error);
  });
  if (foundValid) {
    enableFinishButton();
  } else {
    disableFinishButton();
  }
}

function setNewActiveAnnotationFileRow(activeAnnotationFile, datasetObject) {
  if (activeAnnotationFile) {
    changeAnnotationRowToDefault(activeAnnotationFile.body.fileMetaData.name);
    activeAnnotationFile.newlyActive = false;
    validateExistingImages(datasetObject);
  }
}

// functionality here cannot be used for all, will need
// to be moved to atomic COCOJSON file

function removeVGGJSONFileHandler(fileName, tableName, errorMessage) {
  const datasetObject = getDatasetObject();
  if (tableName === 'annotations') {
    if (errorMessage) {
      let annotationsArrayName;
      if (errorMessage === ONE_ANNOTATION_FILE_ALLOWED_ERROR_MESSAGE) {
        annotationsArrayName = VALID_ANNOTATION_FILES_ARRAY;
      } else {
        annotationsArrayName = FALTY_ANNOTATION_FILES_ARRAY;
      }
      removeFile(fileName, annotationsArrayName);
    } else {
      replaceActiveAnnotationFileIfRemoving(fileName);
      removeFile(fileName, VALID_ANNOTATION_FILES_ARRAY);
      if (getActiveAnnotationFile() !== null) {
        setNewActiveAnnotationFileRow(getActiveAnnotationFile(), datasetObject);
      } else {
        disableFinishButton();
        changeAllImagesTableRowsToDefault();
      }
    }
  } else if (tableName === 'images') {
    removeFile(fileName, IMAGE_FILES_OBJECT);
    if (Object.keys(datasetObject[IMAGE_FILES_OBJECT]).length === 0) {
      disableFinishButton();
    }
  }
  removeRow(fileName, tableName);
}

export { removeVGGJSONFileHandler as default };