responsive-design-flex-grid
================================

Layout arbitrary number of items in a responsive design flex grid. When a viewport resize occurs, # of items / row will rearrange. Maximum 4 items / column

html meta properties
-----------------

- `flex-grid-boundaries`

The key is the number of items / row. The value, in pixels, is the viewport size boundary/threshold. Passing a boundry will trigger a change in # of items / row

    {"1": "340", "2": "475", "3": "644", "4": "824"} 

- `flex-grid-selector`
 
The container div/section containing items

- `flex-grid-debug`

    "true" will turn on `console.log` debug messages
