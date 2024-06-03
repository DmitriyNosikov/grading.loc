import { ReactElement, useEffect, useState } from 'react';
import ProductTypeFilter from './product-type.filter';
import StringsCountFilter from './strings-count.filter copy';

type FilterProps = {
  onChangeHandler?: Function
}

export default function Filter({ onChangeHandler }: FilterProps): ReactElement {
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedStringsCounts, setSelectedStringsCounts] = useState([]);
  const [stringsCountsList, setStringsCountsList] = useState([4, 6, 7, 12]);

  const stringsCountByTypes = {
    'default': [4, 6, 7, 12],
    'guitar': [6, 7, 12],
    'el-guitar': [4, 6, 7],
    'ukulele': [4],
  }

  let types: string[] = selectedTypes.slice();
  let selectedStrings: number[] = selectedStringsCounts.slice();
  let availibleStringsCounts: number[] = [];

  function handleTypeChange(e: React.ChangeEvent<HTMLInputElement>) {
    const target = e.target;
    const selectedType = target.id;

    if(target.checked && !types.includes(selectedType)) {
      types.push(selectedType);
    }

    if(!target.checked && types.includes(selectedType)) {
      types = types.filter((item) => item !== selectedType);
    }

    setSelectedTypes(types as never);
  }

  function handleStringsCountChange(e: React.ChangeEvent<HTMLInputElement>) {
    const target = e.target;
    const stringsCount = Number(target.id.split('-')[0]);

    if(target.checked && !selectedStrings.includes(stringsCount)) {
      selectedStrings.push(stringsCount);
    }

    if(!target.checked && selectedStrings.includes(stringsCount)) {
      selectedStrings = selectedStrings.filter((item) => item !== stringsCount);
    }

    setSelectedStringsCounts(selectedStrings as never[]);
  }

  function changeAvailibleStringsCount() {
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

    setStringsCountsList(availibleStringsCounts);
  }

  function handleClearBtnCLick() {
    setSelectedTypes([]);
    setSelectedStringsCounts([]);
    setStringsCountsList([4, 6, 7, 12]);
  }

  const productTypes = Object.keys(stringsCountByTypes).slice(1);

  // Перерисовка фильтра струн
  useEffect(() => {
    let isMounted = true;

    if(isMounted) {
      changeAvailibleStringsCount();
      setSelectedStringsCounts(selectedStringsCounts);

      if(onChangeHandler) {
        onChangeHandler(selectedTypes, selectedStringsCounts);
      }
    }

    return () => {
      isMounted = false;
    };
  }, [selectedTypes, selectedStringsCounts]);

  return (
    <form className="catalog-filter" action="#" method="post">
      <h2 className="title title--bigger catalog-filter__title">Фильтр</h2>

      <ProductTypeFilter types={productTypes} onChange={handleTypeChange} />

      {
        (stringsCountsList.length > 0) &&
          <StringsCountFilter availibleStringsCounts={stringsCountsList} onChange={handleStringsCountChange} />
      }

      <button className="catalog-filter__reset-btn button button--black-border button--medium" type="reset" onClick={handleClearBtnCLick}>Очистить</button>
    </form>
  );
}
