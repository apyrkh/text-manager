import InsertParams from './middleware/InsertParams';
import UseCodeIfNoText from './middleware/UseCodeIfNoText';
import TextManager from './TextManager';


export default function DefaultTextManager() {
  return new TextManager([InsertParams, UseCodeIfNoText]);
}
