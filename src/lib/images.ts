// Curated editorial stock photography — stand-ins for original Memberridge
// photography. Swap each `id` for an owned asset before launch.

function unsplash(id: string, params = "") {
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&q=80${params}`;
}

export const images = {
  heroHome: unsplash("1495474472287-4d71bcdd2085", "&w=2400"),
  heroCoffeeCollection: unsplash("1524350876685-274059332603", "&w=2400"),
  heroAbout: unsplash("1521302200778-33500795e128", "&w=2400"),

  storyPour: unsplash("1442550528053-c431ecb55509", "&w=1600"),
  storyBeans: unsplash("1447933601403-0c6688de566e", "&w=1600"),
  storyRoaster: unsplash("1587049633312-d628ae50a8ae", "&w=1600"),
  storyHands: unsplash("1610889556528-9a770e32642f", "&w=1600"),

  cafeInterior: unsplash("1509042239860-f550ce710b93", "&w=1800"),
  espressoPull: unsplash("1497935586351-b67a49e012bf", "&w=1600"),
  latteArt: unsplash("1442512595331-e89e73853f31", "&w=1600"),
  baristaPour: unsplash("1559056199-641a0ac8b55e", "&w=1600"),
  marbleCup: unsplash("1512568400610-62da28bc8a13", "&w=1600"),

  farmOrigin1: unsplash("1580933073521-dc49ac0d4e6a", "&w=1800"),
  farmOrigin2: unsplash("1521305916504-4a1121188589", "&w=1800"),
  farmOrigin3: unsplash("1494314671902-399b18174975", "&w=1800"),

  brewFrenchPress: unsplash("1544787219-7f47ccb76574", "&w=1200"),
  brewPourOver: unsplash("1610632380989-680fe40816c6", "&w=1200"),
  brewEspresso: unsplash("1497636577773-f1231844b336", "&w=1200"),
  brewColdBrew: unsplash("1550985616-10810253b84d", "&w=1200"),
  brewChemex: unsplash("1445116572660-236099ec97a0", "&w=1200"),
  brewAeropress: unsplash("1571934811356-5cc061b6821f", "&w=1200"),

  productOriginA: unsplash("1497534446932-c925b458314e", "&w=1400"),
  productOriginB: unsplash("1518057111178-44a106bad636", "&w=1400"),
  productBlendA: unsplash("1481391319762-47dff72954d9", "&w=1400"),
  productEspressoA: unsplash("1543007630-9710e4a00a20", "&w=1400"),
  productBeansMacro: unsplash("1560343090-f0409e92791a", "&w=1400"),
  productFlatLay: unsplash("1497515114629-f71d768fd07c", "&w=1400"),

  gallery1: unsplash("1522992319-0365e5f11656", "&w=1000"),
  gallery2: unsplash("1541167760496-1628856ab772", "&w=1000"),
  gallery3: unsplash("1461023058943-07fcbe16d735", "&w=1000"),
  gallery4: unsplash("1495856458515-0637185db551", "&w=1000"),
} as const;

export type ImageKey = keyof typeof images;
