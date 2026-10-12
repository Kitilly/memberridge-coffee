// Curated editorial stock photography — stand-ins for original Memberridge
// photography. Every ID here was verified against live Unsplash search results
// and checked visually; swap each one for an owned asset before launch.

function unsplash(id: string, width: number) {
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&q=80&w=${width}`;
}

export const images = {
  heroHome: unsplash("1495474472287-4d71bcdd2085", 2400),
  heroCoffeeCollection: unsplash("1524350876685-274059332603", 2400),
  heroAbout: unsplash("1782424467126-c93435062b59", 2400),

  storyPour: unsplash("1648081596668-beccca435ddd", 1600),
  storyBeans: unsplash("1447933601403-0c6688de566e", 1600),
  storyRoaster: unsplash("1511537190424-bbbab87ac5eb", 1600),
  storyHands: unsplash("1762277142860-fdc8c4cfbdd9", 1600),

  cafeInterior: unsplash("1509042239860-f550ce710b93", 1800),
  espressoPull: unsplash("1497935586351-b67a49e012bf", 1600),
  latteArt: unsplash("1442512595331-e89e73853f31", 1600),
  baristaPour: unsplash("1559056199-641a0ac8b55e", 1600),
  marbleCup: unsplash("1512568400610-62da28bc8a13", 1600),

  farmOrigin1: unsplash("1633437805600-2c58bf56663c", 1800),
  farmOrigin2: unsplash("1586095516671-d085ff58cdd4", 1800),
  farmOrigin3: unsplash("1722962883780-8806c3ab546b", 1800),

  brewFrenchPress: unsplash("1544787219-7f47ccb76574", 1200),
  brewPourOver: unsplash("1610632380989-680fe40816c6", 1200),
  brewEspresso: unsplash("1497636577773-f1231844b336", 1200),
  brewColdBrew: unsplash("1531835207745-506a1bc035d8", 1200),
  brewChemex: unsplash("1445116572660-236099ec97a0", 1200),
  brewAeropress: unsplash("1571934811356-5cc061b6821f", 1200),

  // Product still lifes — warm wood, low light, beans and cups.
  beansScatter: unsplash("1675306408031-a9aad9f23308", 1400),
  beansDense: unsplash("1606486544554-164d98da4889", 1400),
  beansMacro: unsplash("1612487458970-564127ec86f5", 1400),
  beansSpill: unsplash("1692296113053-76f240e5ce33", 1400),
  cupInBeans: unsplash("1625021659159-f63f546d74a7", 1400),
  beansDark: unsplash("1551610290-e153ec567dd8", 1400),
  beansWood: unsplash("1620820186187-fc32e79adb74", 1400),
  cupShadow: unsplash("1761384595903-9b339edd72ed", 1400),
  espressoSunlight: unsplash("1783227497206-637d2cf8f05c", 1400),
  carafePour: unsplash("1620052087071-ed42fff4501d", 1400),
  handCup: unsplash("1518057111178-44a106bad636", 1400),
  productFlatLay: unsplash("1497515114629-f71d768fd07c", 1400),
  beansBoard: unsplash("1770199015377-73c4d0c78138", 1400),

  gallery1: unsplash("1522992319-0365e5f11656", 1000),
  gallery2: unsplash("1541167760496-1628856ab772", 1000),
  gallery3: unsplash("1461023058943-07fcbe16d735", 1000),
  gallery4: unsplash("1561986810-4f3ba2f46ceb", 1000),
} as const;

export type ImageKey = keyof typeof images;
