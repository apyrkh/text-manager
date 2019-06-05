import InsertParams from './middleware/InsertParams';
import UseCodeIfNoText from './middleware/UseCodeIfNoText';
import TextManager from './TextManager';


export default function DefaultTextManager(middleware = [InsertParams, UseCodeIfNoText]) {
  return new TextManager(middleware);
}
