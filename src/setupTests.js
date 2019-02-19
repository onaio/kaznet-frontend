// Setup tests
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import fontawesome from '@fortawesome/fontawesome';
import faFolderOpen from '@fortawesome/fontawesome-free-solid/faFolderOpen';
import faSearch from '@fortawesome/fontawesome-free-solid/faSearch';
import faCaretDown from '@fortawesome/fontawesome-free-solid/faCaretDown';
import faExternalLinkAlt from '@fortawesome/fontawesome-free-solid/faExternalLinkAlt';
import faLaptop from '@fortawesome/fontawesome-free-solid/faLaptop';
import faClone from '@fortawesome/fontawesome-free-solid/faClone';
import faExclamationCircle from '@fortawesome/fontawesome-free-solid/faExclamationCircle';

fontawesome.library.add(
  faSearch,
  faCaretDown,
  faClone,
  faExternalLinkAlt,
  faLaptop,
  faFolderOpen,
  faExclamationCircle
);

configure({ adapter: new Adapter() });
