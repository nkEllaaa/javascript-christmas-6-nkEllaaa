import MenuList from '../MenuList.js';

const validateMenu = (menuAndQuantity) => {
  if (menuAndQuantity.length < 1) throw new Error('[ERROR]1');

  const orderPattern = /^([가-힣]+)-(\d+)$/;
  const isValidPattern = menuAndQuantity.every((menu) => orderPattern.test(menu));

  const menuNames = menuAndQuantity.flatMap((menuAndQuantity) => {
    return menuAndQuantity.split(',').map((menuName) => menuName.split('-')[0]);
  });

  const invalidMenu = menuNames.find((name) => !MenuList.hasOwnProperty(name));
  if (invalidMenu) throw new Error(`[ERROR]3`);

  if (menuNames.every((menuName) => MenuList[menuName].type === 'beverage'))
    throw new Error('[ERROR]4');

  if (menuNames.length !== new Set(menuNames).size) throw new Error('[ERROR]5');
};

export default validateMenu;
