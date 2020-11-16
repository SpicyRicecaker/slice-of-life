# Things required for daily use
  - Use indexedDB along with svelte stores

# Candy
  - Must have some sort of data backup
    - Github actions? Link to github somehow?
  - Better UI where information is stored in blocks of color
  - Different color palette generator for doughnut
  
# Icing
  - Yearly time use as dynamic square grid
  - BST equation editor setup pulled from prompurr

# IndexedDB & Svelte Stores implementation
  - `dataset` store is just a svelte store with an array of day objects. (`[{day}, {day}]`).
  - Everytime that the store is updated, take every `day` in the `dataset` and update the database by `date: ...`
    - Everytime that `{day}` in `datasets` is updated, queue an update to the database
  - On write mode (normal), check if the database contains date `today`. If yes, load the `date`. If not, then create a new dataset for `today`.
    - On `input`, when pushing to array, we can then just push to our one data array (i.e. `$days[0]`) since it only has this one date today 
      - Next, we can then just `set()` the object at `today` to our current `$days[0]`
    - In menu, have an option to select and change `today` to a date to the past, and have the algorithm respond accordingly. Important next step after we get `today` working.
  - On readonly mode, have an option to select a datepicker from x date to y date. Should 100% be part of icing
# IndexedDB & Svelte Stores implementation
  - `dataset` store is just a svelte store with an array of day objects. (`[{day}, {day}]`).
  - Everytime that the store is updated, take every `day` in the `dataset` and update the database by `date: ...`
    - Everytime that `{day}` in `datasets` is updated, queue an update to the database
  - On write mode (normal), check if the database contains date `today`. If yes, load the `date`. If not, then create a new dataset for `today`.
    - On `input`, when pushing to array, we can then just push to our one data array (i.e. `$days[0]`) since it only has this one date today 
      - Next, we can then just `set()` the object at `today` to our current `$days[0]`
    - In menu, have an option to select and change `today` to a date to the past, and have the algorithm respond accordingly. Important next step after we get `today` working.
  - On readonly mode, have an option to select a datepicker from x date to y date. Should 100% be part of icing