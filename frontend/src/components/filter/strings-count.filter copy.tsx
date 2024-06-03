import { ChangeEventHandler, ReactElement } from 'react';

type StringsCountFilterProps = {
  availibleStringsCounts: number[],
  onChange?: ChangeEventHandler<HTMLInputElement>
};

export default function StringsCountFilter({ availibleStringsCounts, onChange }: StringsCountFilterProps): ReactElement {
  return (
    <fieldset className="catalog-filter__block">
      <legend className="catalog-filter__block-title">Количество струн</legend>

      {
        availibleStringsCounts.map((item) => {
          return (
            <div className="form-checkbox catalog-filter__block-item">
              <input className="visually-hidden" type="checkbox" id={`${item}-strings`} name={`${item}-strings`} onChange={onChange}/>
              <label htmlFor={`${item}-strings`}>{item}</label>
            </div>
          );
        })
      }
    </fieldset>
  )
}
