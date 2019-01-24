## Removing `sanitize.css`

To remove `sanitize.css` you will need to remove it from both:

- [`app.ts`](../../app/app.tsx)

```diff
import * as FontFaceObserver from 'fontfaceobserver';
import history from './utils/history';
-import 'sanitize.css/sanitize.css';
```

- [`package.json`](../../package.json)!

```diff
"dependencies": {
  ...
  "reselect": "4.0.0",
- "sanitize.css": "8.0.0",
  "styled-components": "4.1.1"
},
```
