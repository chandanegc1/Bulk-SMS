const Input = ({ type, name, labelText, defaultValue, onChange, required}) => {
  return (
    <div className='form-row'>
      <label htmlFor={name} className='form-label'>
        {labelText || name}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        className='form-input'
        defaultValue={defaultValue || ''}
        onChange={onChange}
        required={required || false}
      />
    </div>
  );
};
export default Input;
