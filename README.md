# Slice of Life
  - "Never have a 0% day"

# Bug Fixes / Small Features
  
    
# Daily Use Required
  - Color palette generator for doughnut
    - Given a number x, as well as a color scheme made up of 3 colors, return x colors spaced equally in the color scheme. 
    - Really important because without colors a pie chart is practically useless
    - Have colors of wheel tied to list

  - Custom legend
    - Either use `generateLegend()`
    - Or somehow tie in color of chart to `List.svelte`
    - For the time being, legend is *REMOVED*

  - "Change tab"
    - Change is effectively useless if you can't measure how effective it is
    - Make it possible for
      - Noting observations
      - Then proposing reasons for change based off those observations
      - Most importantly MEASURING the difference in QOL, objectively

  - Ability to directly edit list items
    - On div click, spawn textarea, listen for changes. We'll probably need to make input checker more modular.
      - If input is correct, animate a green wave and update value
      - If input is incorrect, animate a red wave and cancel change

# Candy
  - Sort by value
    - Have option to sort by date and value
    - Need to open a value index
  - Have some sort of data backup
    - Github OAuth?
  
  
# Icing
  - Yearly time use as dynamic square grid
  - Syntax Highlighting for subjects

# IndexedDB Optimization
  - Make set and push update db
  - Make db an object
    - More modular so we don't have to write it over and over

<div>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>