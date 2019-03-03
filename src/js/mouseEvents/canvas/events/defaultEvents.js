import { displayPolygonPoints, hidePolygonPoints } from '../../../canvas/canvasObjects/polygon/changePolygon';

const selectedPolygonPoints = {};

function assignDefaultEvents(canvas) {
  canvas.on('mouse:down', (e) => {
    hidePolygonPoints();
    if (e.target) {
      canvas.setActiveObject(e.target);
      if (e.target.shapeName === 'polygon') {
        displayPolygonPoints(canvas, e.target._objects);
      }
    }
  });

  canvas.on('mouse:over', (e) => {
    if (e.target && e.target._objects) {
      e.target._objects[0].set('fill', 'rgba(255,0,0,0.2)');
      canvas.renderAll();
    }
  });

  canvas.on('mouse:out', (e) => {
    if (e.target && e.target._objects) {
      if (e.target.shapeName === 'bndBox') {
        e.target._objects[0].set('fill', 'rgba(255,0,0,0');
      } else if (e.target.shapeName === 'polygon') {
        e.target._objects[0].set('fill', 'rgba(255,0,0,0.01)');
      }
      canvas.renderAll();
    }
  });
}

export { assignDefaultEvents, selectedPolygonPoints };