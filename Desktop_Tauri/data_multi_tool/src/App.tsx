import { open } from '@tauri-apps/plugin-dialog';
import { readDir } from '@tauri-apps/plugin-fs';
import { useState } from 'react';
import "./App.css";

const STORAGE_PATH = "/storage/emulated/0/Documents/docs/notes/data";

function App() {
  const [currentPath, setCurrentPath] = useState(STORAGE_PATH)
  const [filesInDirectory, setFilesInDirectory] = useState<string[]>([]);

  const onSelectProjectPress = async () => {
    const directory = await open({
      multiple: false,
      directory: true,
    })

    console.log("Selected directory:", directory);
  }

  async function onReadFilesFromDirPress(): Promise<void> {
    const entries = await readDir(currentPath)
    const filePaths = entries.map((entry) => entry.name);

    setFilesInDirectory(filePaths);
  }

  async function onDirectoryPress(dir: string): Promise<void> {
    const unsafeNewPath = currentPath + "/" + dir

    setCurrentPath(e => {
      const safeNewPath = e + "/" + dir
      return safeNewPath
    });

    const entries = await readDir(unsafeNewPath)
    const filePaths = entries.map((entry) => entry.name);

    setFilesInDirectory(filePaths);
  }

  return (
    <div className="container">
      <button onClick={onSelectProjectPress}>
        {"Select Project"}
      </button>
      {"Text whoa, I'm in the movie!"}
      <button onClick={onReadFilesFromDirPress}>
        {"Read Files"}
      </button>
      <span>
        {"Files in Directory:"}
      </span>
      <div className="fileList">
        {filesInDirectory.map((file) => (
          <button onClick={() => onDirectoryPress(file)} key={file}>{file}</button>
        ))}
      </div>
    </div>
  );
}

export default App;
