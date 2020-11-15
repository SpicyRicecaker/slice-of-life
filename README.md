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