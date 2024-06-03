import { ChangeEventHandler, ReactElement } from 'react';

type ProductTypeFilterProps = {
  types: string[],
  onChange?: ChangeEventHandler<HTMLInputElement>
};

const typesText: Record<string, string> = {
  'guitar': 'Акустические гитары',
  'el-guitar': 'Электрогитары',
  'ukulele': 'Укулеле',
};

export default function ProductTypeFilter({ types, onChange }: ProductTypeFilterProps): ReactElement {
  return (
    <fieldset className="catalog-filter__block">
      <legend className="catalog-filter__block-title">Тип гитар</legend>

      {
        types.map((item) => {
          return (
            <div className="form-checkbox catalog-filter__block-item">
              <input className="visually-hidden" type="checkbox" id={item} name={item} onChange={onChange} />
              <label htmlFor={item}>{ typesText[item] }</label>
            </div>
          );
        })
      }
    </fieldset>
  )
}
