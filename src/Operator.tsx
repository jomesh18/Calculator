interface Props {
  id: string;
  operator: string;
  handleClick: (operator: string) => void;
}

const Operator = ({ id, operator, handleClick }: Props) => {
  return (
    <button id={id} onClick={() => handleClick(operator)}>
      {operator}
    </button>
  );
};

export default Operator;
