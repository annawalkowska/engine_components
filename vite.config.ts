/* eslint-disable import/no-extraneous-dependencies */
import * as fs from "fs";
import * as path from "path";
import { defineConfig } from "vite";
import { globSync } from "glob";

const writeIndexHTML = () => {
  let links: string = "
        <a style="width: fit-content;" href="./packages\front\src\measurement\VolumeMeasurement\example.html">front/VolumeMeasurement</a>
      <a style="width: fit-content;" href="./packages\front\src\measurement\LengthMeasurement\example.html">front/LengthMeasurement</a>
      <a style="width: fit-content;" href="./packages\front\src\measurement\FaceMeasurement\example.html">front/FaceMeasurement</a>
      <a style="width: fit-content;" href="./packages\front\src\measurement\EdgeMeasurement\example.html">front/EdgeMeasurement</a>
      <a style="width: fit-content;" href="./packages\front\src\measurement\AreaMeasurement\example.html">front/AreaMeasurement</a>
      <a style="width: fit-content;" href="./packages\front\src\measurement\AngleMeasurement\example.html">front/AngleMeasurement</a>
      <a style="width: fit-content;" href="./packages\front\src\fragments\Sections\example.html">front/Sections</a>
      <a style="width: fit-content;" href="./packages\front\src\fragments\Plans\example.html">front/Plans</a>
      <a style="width: fit-content;" href="./packages\front\src\fragments\IfcStreamer\example.html">front/IfcStreamer</a>
      <a style="width: fit-content;" href="./packages\front\src\fragments\Highlighter\example.html">front/Highlighter</a>
      <a style="width: fit-content;" href="./packages\front\src\core\PostproductionRenderer\example.html">front/PostproductionRenderer</a>
      <a style="width: fit-content;" href="./packages\core\src\openbim\BCFTopics\example.html">core/BCFTopics</a>
      <a style="width: fit-content;" href="./packages\core\src\measurement\MeasurementUtils\example.html">core/MeasurementUtils</a>
      <a style="width: fit-content;" href="./packages\core\src\ifc\IfcRelationsIndexer\example.html">core/IfcRelationsIndexer</a>
      <a style="width: fit-content;" href="./packages\core\src\ifc\IfcPropertiesManager\example.html">core/IfcPropertiesManager</a>
      <a style="width: fit-content;" href="./packages\core\src\ifc\IfcJsonExporter\example.html">core/IfcJsonExporter</a>
      <a style="width: fit-content;" href="./packages\core\src\fragments\IfcLoader\example.html">core/IfcLoader</a>
      <a style="width: fit-content;" href="./packages\core\src\fragments\Hider\example.html">core/Hider</a>
      <a style="width: fit-content;" href="./packages\core\src\fragments\FragmentsManager\example.html">core/FragmentsManager</a>
      <a style="width: fit-content;" href="./packages\core\src\fragments\Exploder\example.html">core/Exploder</a>
      <a style="width: fit-content;" href="./packages\core\src\fragments\Classifier\example.html">core/Classifier</a>
      <a style="width: fit-content;" href="./packages\core\src\fragments\BoundingBoxer\example.html">core/BoundingBoxer</a>
      <a style="width: fit-content;" href="./packages\core\src\core\Worlds\example.html">core/Worlds</a>
      <a style="width: fit-content;" href="./packages\core\src\core\Raycasters\example.html">core/Raycasters</a>
      <a style="width: fit-content;" href="./packages\core\src\core\OrthoPerspectiveCamera\example.html">core/OrthoPerspectiveCamera</a>
      <a style="width: fit-content;" href="./packages\core\src\core\MiniMap\example.html">core/MiniMap</a>
      <a style="width: fit-content;" href="./packages\core\src\core\Grids\example.html">core/Grids</a>
      ";
  const examplePaths = globSync("packages/**/src/**/example.html");
  for (const examplePath of examplePaths) {
    const directory = path.dirname(examplePath);
    const packageNameMatch = directory.match(/packages\\([^\\]+)/);
    if (!(packageNameMatch && packageNameMatch.length > 1)) continue;
    const packageName = packageNameMatch[1];
    const exampleName = path.basename(directory);
    links += `<a style="width: fit-content;" href="./${examplePath}">${packageName}/${exampleName}</a>\n`;
  }
  const index = `
  <!DOCTYPE html>
  <html lang="en">
  
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Examples Index</title>
    <style>
      * {
        margin: 0;
      }
  
      html {
        font-family: sans-serif;
      }
  
      body {
        padding: 1rem;
      }
    </style> 
  </head>
  
  <body>
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <h3>Choose an example</h3>
      ${links}
    </div>
  </body>
  
  </html>
      `;
  fs.writeFileSync("./index.html", index);
};

const createIndex = () => ({
  name: "create-index",
  configureServer() {
    // fs.watch("./packages", { recursive: true }, writeIndexHTML);
    writeIndexHTML();
  },
});

export default defineConfig({
  plugins: [createIndex()],
});
