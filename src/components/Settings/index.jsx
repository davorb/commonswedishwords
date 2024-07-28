import Button from "../Button";
import "./Settings.css";

const dataSets = [
  {
    name: "top 1000 (recommended)",
    file: "hard_words.json",
  },
  {
    name: "easy 300",
    file: "swedish_words.json",
  },
];

const Settings = ({ toggleSettings, selectItem }) => {
  const handleClick = (item) => () => {
    selectItem(item);
    toggleSettings();
  };
  return (
    <div className="settings">
      <Button onClick={toggleSettings}>❌</Button>
      <h1>select a dataset</h1>
      <ul>
        {dataSets.map((dataset) => (
          <li onClick={handleClick(dataset.file)} key={dataset.file}>
            {dataset.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Settings;
