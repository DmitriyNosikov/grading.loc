import { ReactElement, useState } from 'react';
import ProductTypeFilter from './product-type.filter';
import StringsCountFilter from './strings-count.filter copy';

export default function Filter(): ReactElement {
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [stringsCountsList, setStringsCountsList] = useState([4, 6, 7, 12]);
  const [selectedStringsCounts, setSelectedStringsCounts] = useState([]);

  const stringsCountByTypes = {
    'default': [4, 6, 7, 12],
    'guitar': [6, 7, 12],
    'el-guitar': [4, 6, 7],
    'ukulele': [4],
  }

  const productTypes = Object.keys(stringsCountByTypes).slice(1);
  let availibleStringsCounts: number[] = [];

  if(selectedTypes.length > 0) {
    selectedTypes.forEach((type) => {
      if(stringsCountByTypes[type]) {
        const typeStringsCount: number[] = stringsCountByTypes[type];

        availibleStringsCounts.push(...typeStringsCount);
      }
    });

    if(availibleStringsCounts.length > 0) {
      availibleStringsCounts = Array.from(new Set(availibleStringsCounts));
    }
  } else {
    availibleStringsCounts = stringsCountByTypes['default'];
  }


  function handleTypeChange(e: React.ChangeEvent<HTMLInputElement>) {
    const target = e.target;

    console.log('Type changed: ', target.id, target.checked);
  }

  function handleStringsCountChange(e: React.ChangeEvent<HTMLInputElement>) {
    const target = e.target;
    const stringsCount = Number(target.id.split('-')[0]);
    let selectedStrings: number[] = selectedStringsCounts;

    if(target.checked && !selectedStrings.includes(stringsCount)) {
      selectedStrings.push(stringsCount);
    }

    if(!target.checked && selectedStrings.includes(stringsCount)) {
      selectedStrings = selectedStrings.filter((item) => item !== stringsCount);
    }

    setSelectedStringsCounts(selectedStrings as never[]);
    console.log('Strings count changed: ', selectedStrings);
  }

  return (
    <form className="catalog-filter" action="#" method="post">
      <h2 className="title title--bigger catalog-filter__title">Фильтр</h2>

      <ProductTypeFilter types={productTypes} onChange={handleTypeChange} />

      {
        (availibleStringsCounts.length > 0) &&
          <StringsCountFilter availibleStringsCounts={stringsCountsList} onChange={handleStringsCountChange} />
      }

      <button className="catalog-filter__reset-btn button button--black-border button--medium" type="reset">Очистить</button>
    </form>
  );
}
