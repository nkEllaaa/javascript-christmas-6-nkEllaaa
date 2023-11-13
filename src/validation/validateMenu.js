import MENU from '../constants/menu';

const validateMenu = (menuAndQuantity) => {
  if (menuAndQuantity.length < 1) throw new Error('[ERROR]');

  const orderPattern = /^([가-힣]+)-(\d+)(?:, ([가-힣]+)-(\d+))*$/;
  if (!orderPattern.test(menuAndQuantity)) throw new Error('[ERROR]');

  const menuNames = menuAndQuantity.map((menuName) => {
    menuName.split('-')[0];
  });

  const invalidMenu = menuNames.find((name) => !MENU.hasOwnProperty(name));
  if (invalidMenu) throw new Error(`[ERROR]`);
  
  if (!menuNames.every((menuName) => MENU[menuName] && MENU[menuName].type === 'beverage')) throw new Error('[ERROR]');

  if (menuNames.length !== new Set(menuNames).size) throw new Error('[ERROR]');
};

export default validateMenu;
