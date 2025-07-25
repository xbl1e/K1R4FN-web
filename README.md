# K1R4FN Web Project

## 🌟 Overview

Welcome to the **K1R4FN Web Project**, a modern and interactive website built to showcase K1R4FN's favorite skin. The site features a rotating 3D model rendered using `Three.js`, providing an engaging and visually appealing experience.

---

## 📂 Project Structure

The project is organized into the following directories and files:

```text
/
├── public/
│   └── cdn/
│       └── models/
│           └── scene.gltf       # 3D model file used in the website
├── src/
│   ├── pages/
│   │   └── index.astro          # Main page of the website
│   ├── scripts/
│   │   └── modelLoader.js       # Script to load and render the 3D model
│   └── styles/
│       └── global.css           # Global styles for the website
├── [package.json](http://_vscodecontentref_/0)                 # Project dependencies and scripts
├── [README.md](http://_vscodecontentref_/1)                    # Project documentation
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.