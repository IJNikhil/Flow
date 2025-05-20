import IMAGES from '../assets/icons';
import SCREENS from '../screens/screenNames';
import APP_CONSTANTS from '../strings/appConstants';

type TabItem = {
  name: string;
  label: string;
  icon: any; // Update to `ImageSourcePropType` if using TypeScript and `react-native`
};

const TABS: TabItem[] = [
  {
    name: SCREENS.HOME || 'Home',
    label: APP_CONSTANTS.LABELS.HOME || 'Home',
    icon: IMAGES.HOME,
  },
  {
    name: SCREENS.PLAY || 'Play',
    label: APP_CONSTANTS.LABELS.PLAY || 'Play',
    icon: IMAGES.PLAY,
  },
  {
    name: SCREENS.CATEGORY || 'Category',
    label: APP_CONSTANTS.LABELS.CATEGORY || 'Category',
    icon: IMAGES.CATEGORY,
  },
  {
    name: SCREENS.USER || 'Profile',
    label: APP_CONSTANTS.LABELS.USER || 'Profile',
    icon: IMAGES.USER,
  },
  {
    name: SCREENS.TROLLEY || 'Cart',
    label: APP_CONSTANTS.LABELS.CART || 'Cart',
    icon: IMAGES.TROLLEY,
  },
];

export default TABS;
