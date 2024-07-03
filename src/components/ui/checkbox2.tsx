const CheckboxComponent = () => {
  return (
    <label className="checkboxlabel">
      <input className="peer absolute h-0 w-0 opacity-0" type="checkbox" />
      <span className="checkboxdesign" />
    </label>
  );
};

export default CheckboxComponent;
