import { ChangeEventHandler, ReactElement } from 'react';

type SelectProductTypeProps = {
  selectedValue?: string,
  additionalClassName: string;
  onChangeHandler: ChangeEventHandler<HTMLInputElement>
};

export default function SelectProductType({ selectedValue, additionalClassName, onChangeHandler }: SelectProductTypeProps): ReactElement {
  const typesList = [
    {
      id: 'guitar',
      checked: false,
      text: 'Акустическая гитара'
    },
    {
      id: 'el-guitar',
      checked: false,
      text: 'Электрогитара'
    },
    {
      id: 'ukulele',
      checked: false,
      text: 'Укулеле'
    },
  ];
  return (
    <div className={`input-radio ${additionalClassName}`}><span>Тип товара</span>
      {
        typesList.map((type) => {
          const isChecked = (selectedValue && type.id === selectedValue) ? true : false;

          return (
            <>
              <input type="radio" id={type.id} name="item-type" value={type.id} checked={isChecked} onChange={onChangeHandler} />
              <label htmlFor={type.id}>{type.text}</label>
            </>
          );
        })
      }
    </div>
  );
}
