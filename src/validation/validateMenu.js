import MenuList from '../MenuList.js';
import { ERROR_MENU } from '../constants/error.js';

const validateMenu = (menuAndQuantity) => {
  if (menuAndQuantity.length < 1) throw new Error(ERROR_MENU.none);

  const orderPattern = /^([가-힣]+)-(\d+)$/;
  const isValidPattern = menuAndQuantity.every((menu) => orderPattern.test(menu));
  if (!isValidPattern) throw new Error(ERROR_MENU.pattern);

  const menuNames = menuAndQuantity.flatMap((menuAndQuantity) => {
    return menuAndQuantity.split(',').map((menuName) => menuName.split('-')[0]);
  });

  const isMenu = menuNames.find((name) => !MenuList.hasOwnProperty(name));
  if (isMenu) throw new Error(ERROR_MENU.none);

  if (menuNames.every((menuName) => MenuList[menuName].type === 'beverage'))
    throw new Error(ERROR_MENU.onlyBeverage);

  if (menuNames.length !== new Set(menuNames).size) throw new Error(ERROR_MENU.duplicated);
};

export default validateMenu;
