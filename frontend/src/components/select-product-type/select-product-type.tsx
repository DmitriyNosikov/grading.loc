import { ChangeEventHandler, ReactElement } from 'react';

type SelectProductTypeProps = {
  additionalClassName: string;
  onChangeHandler: ChangeEventHandler<HTMLInputElement>
};

export default function SelectProductType({ additionalClassName, onChangeHandler }: SelectProductTypeProps): ReactElement {
  // edit-item__form-radio
  // edit-item__form-radio
  return (
    <div className={`input-radio ${additionalClassName}`}><span>Тип товара</span>
      <input type="radio" id="guitar" name="item-type" value="guitar" onChange={onChangeHandler} />
      <label htmlFor="guitar">Акустическая гитара</label>
      <input type="radio" id="el-guitar" name="item-type" value="el-guitar" onChange={onChangeHandler} />
      <label htmlFor="el-guitar">Электрогитара</label>
      <input type="radio" id="ukulele" name="item-type" value="ukulele" onChange={onChangeHandler} />
      <label htmlFor="ukulele">Укулеле</label>
    </div>
  );
}
