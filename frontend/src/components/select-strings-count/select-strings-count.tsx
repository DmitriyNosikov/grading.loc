import { ChangeEventHandler, ReactElement } from 'react';

type SelectSctingsCountProps = {
  selectedValue?: number;
  additionalClassName: string;
  onChangeHandler: ChangeEventHandler<HTMLInputElement>
};

export default function SelectStringsCount({ selectedValue, additionalClassName, onChangeHandler }: SelectSctingsCountProps): ReactElement {
  const stringsCountList = [
    {
      id: 'string-qty-4',
      checked: false,
      value: 4
    },
    {
      id: 'string-qty-6',
      checked: false,
      value: 6
    },
    {
      id: 'string-qty-7',
      checked: false,
      value: 7
    },
    {
      id: 'string-qty-4',
      checked: false,
      value: 12
    },
  ];
  return (
    <div className={`input-radio ${additionalClassName}`}><span>Количество струн</span>
      {
        stringsCountList.map((item) => {
          const isChecked = (selectedValue && item.value === selectedValue) ? true : false;

          return (
            <>
            <input type="radio" id={item.id} name="string-qty" value={item.value} checked={isChecked} onChange={onChangeHandler} />
            <label htmlFor={item.id}>{item.value}</label>
            </>
          );
        })
      }
    </div>
  );
}
