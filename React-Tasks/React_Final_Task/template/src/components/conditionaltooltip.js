import Tooltip from "@reach/tooltip";

const Testtip = ({ disabled }) => {
  const content = "";

  if (disabled === true) {
    return <Tooltip label="I'm a tooltip">{content}</Tooltip>;
  }

  return content;
};

export default Testtip;