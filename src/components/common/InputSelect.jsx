import Select from "react-select";
import Button from "./Button";
import { CaretDown } from "@phosphor-icons/react";
import { useState } from "react";


const InputSelect = ({options}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState("");

  const toggleOpen = () => {
    setIsOpen((prev) => !prev);
  };
  const onSelectChange = (event) => {
    toggleOpen();
    setValue(event.label);
  };

  const Dropdown = ({ children, isOpen, target, onClose, }) => (
    <div css={{ position: "relative" }}>
      {target}
      {isOpen ? <Menu>{children}</Menu> : null}
      {isOpen ? <Blanket onClick={onClose} /> : null}
    </div>
  );

  const Blanket = (props) => (
    <div
      css={{
        bottom: 0,
        left: 0,
        top: 0,
        right: 0,
        position: "fixed",
        zIndex: 1,
      }}
      {...props}
    />
  );

  const Menu = (props) => {
    const shadow = "hsla(218, 50%, 10%, 0.1)";
    return (
      <div
        css={{
          backgroundColor: "white",
          borderRadius: 4,
          boxShadow: `0 0 0 1px ${shadow}, 0 4px 11px ${shadow}`,
          marginTop: 8,
          position: "absolute",
          zIndex: 2,
        }}
        {...props}
      />
    );
  };

  return (
    <>
      <Dropdown
        isOpen={isOpen}
        onClose={toggleOpen}
        target={
          <Button
            rightIcon={<CaretDown size={16} />}
            onClick={toggleOpen}
            isSelected={isOpen}
            btnName={value ? `State: ${value}` : "Select a State"}
            sx={{
              backgroundColor: "#FFFFFF",
              color: "#454545",
              boxShadow: "none",
              border: "0.0625rem solid #D6D6D6",
              "&:hover": {
                boxShadow: "none",
              },
              fontSize: "14px",
            }}
          />
        }
      >
        <Select
          autoFocus
          backspaceRemovesValue={false}
          controlShouldRenderValue={false}
          hideSelectedOptions={false}
          isClearable={false}
          menuIsOpen
          onChange={onSelectChange}
          options={options}
          placeholder="Search..."
          tabSelectsValue={false}
          value={value}
        />
      </Dropdown>
    </>
  );
};

export default InputSelect;
