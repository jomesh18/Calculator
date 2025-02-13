interface Props {
  digit: string;
  id: string;
  handleClick: (digit: string) => void;
}

const Digit = ({ digit, id, handleClick }: Props) => {
  return (
    <button id={id} value={digit} onClick={() => handleClick(digit)}>
      {digit}
    </button>
  );
};

export default Digit;
