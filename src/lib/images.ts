// Curated editorial stock photography — stand-ins for original Memberridge
// photography. Swap each `id` for an owned asset before launch.

function unsplash(id: string, params = "") {
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&q=80${params}`;
}

export const images = {
  heroHome: unsplash("1495474472287-4d71bcdd2085", "&w=2400"),
  heroCoffeeCollection: unsplash("1524350876685-274059332603", "&w=2400"),
  heroAbout: unsplash("1782424467126-c93435062b59", "&w=2400"),

  storyPour: unsplash("1648081596668-beccca435ddd", "&w=1600"),
  storyBeans: unsplash("1447933601403-0c6688de566e", "&w=1600"),
  storyRoaster: unsplash("1511537190424-bbbab87ac5eb", "&w=1600"),
  storyHands: unsplash("1762277142860-fdc8c4cfbdd9", "&w=1600"),

  cafeInterior: unsplash("1509042239860-f550ce710b93", "&w=1800"),
  espressoPull: unsplash("1497935586351-b67a49e012bf", "&w=1600"),
  latteArt: unsplash("1442512595331-e89e73853f31", "&w=1600"),
  baristaPour: unsplash("1559056199-641a0ac8b55e", "&w=1600"),
  marbleCup: unsplash("1512568400610-62da28bc8a13", "&w=1600"),

  farmOrigin1: unsplash("1633437805600-2c58bf56663c", "&w=1800"),
  farmOrigin2: unsplash("1586095516671-d085ff58cdd4", "&w=1800"),
  farmOrigin3: unsplash("1722962883780-8806c3ab546b", "&w=1800"),

  brewFrenchPress: unsplash("1544787219-7f47ccb76574", "&w=1200"),
  brewPourOver: unsplash("1610632380989-680fe40816c6", "&w=1200"),
  brewEspresso: unsplash("1497636577773-f1231844b336", "&w=1200"),
  brewColdBrew: unsplash("1531835207745-506a1bc035d8", "&w=1200"),
  brewChemex: unsplash("1445116572660-236099ec97a0", "&w=1200"),
  brewAeropress: unsplash("1571934811356-5cc061b6821f", "&w=1200"),

  productOriginA: unsplash("1632642387132-fab918357043", "&w=1400"),
  productOriginB: unsplash("1518057111178-44a106bad636", "&w=1400"),
  productBlendA: unsplash("1640587662002-ae577f8f96dd", "&w=1400"),
  productEspressoA: unsplash("1543007630-9710e4a00a20", "&w=1400"),
  productBeansMacro: unsplash("1770199015377-73c4d0c78138", "&w=1400"),
  productFlatLay: unsplash("1497515114629-f71d768fd07c", "&w=1400"),

  gallery1: unsplash("1522992319-0365e5f11656", "&w=1000"),
  gallery2: unsplash("1541167760496-1628856ab772", "&w=1000"),
  gallery3: unsplash("1461023058943-07fcbe16d735", "&w=1000"),
  gallery4: unsplash("1561986810-4f3ba2f46ceb", "&w=1000"),
} as const;

export type ImageKey = keyof typeof images;
