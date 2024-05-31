import { ChangeEventHandler, ReactElement } from 'react';

type SelectSctingsCountProps = {
  additionalClassName: string;
  onChangeHandler: ChangeEventHandler<HTMLInputElement>
};

export default function SelectStringsCount({ additionalClassName, onChangeHandler }: SelectSctingsCountProps): ReactElement {
  return (
    <div className={`input-radio ${additionalClassName}`}><span>Количество струн</span>
      <input type="radio" id="string-qty-4" name="string-qty" value="4" onChange={onChangeHandler} />
      <label htmlFor="string-qty-4">4</label>
      <input type="radio" id="string-qty-6" name="string-qty" value="6" onChange={onChangeHandler} />
      <label htmlFor="string-qty-6">6</label>
      <input type="radio" id="string-qty-7" name="string-qty" value="7" onChange={onChangeHandler} />
      <label htmlFor="string-qty-7">7</label>
      <input type="radio" id="string-qty-12" name="string-qty" value="12" onChange={onChangeHandler} />
      <label htmlFor="string-qty-12">12</label>
    </div>
  );
}
