import Button from "../Button";
import "./Settings.css";
import { DATASETS } from "../../constants";

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
        {DATASETS.map((dataset) => (
          <li onClick={handleClick(dataset.file)} key={dataset.file}>
            {dataset.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Settings;
