const Input = ({ name, type, placeholder }) => {
  return (
    <label className="form__label">
      {name}:
      <input
        className="form__input"
        type={type}
        placeholder={placeholder}
        name={name}
        required
      />
    </label>
  );
};

export default Input;
