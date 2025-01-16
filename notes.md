# Checklist

<!-- Make sure you fill out this checklist with what you've done before submitting! -->

- [✓] Read the README [please please please]
- [✓] Something cool!
- [✓] Back-end
  - [✓] Minimum Requirements
    - [✓] Setup MongoDB database
    - [✓] Setup item requests collection
    - [✓] `PUT /api/request`
    - [✓] `GET /api/request?page=_`
  - [✓] Main Requirements
    - [✓] `GET /api/request?status=pending`
    - [✓] `PATCH /api/request`
  - [✓] Above and Beyond
    - [✓] Batch edits
    - [✓] Batch deletes
- [✓] Front-end
  - [✓] Minimum Requirements
    - [✓] Dropdown component
    - [✓] Table component
    - [✓] Base page [table with data]
    - [✓] Table dropdown interactivity
  - [✓] Main Requirements
    - [✓] Pagination
    - [✓] Tabs
  - [✓] Above and Beyond
    - [✓] Batch edits
    - [✓] Batch deletes

# Notes

Notes on the Batch functionalities:
- For Batch edit backend, I'm using the endpoint `PATCH /api/requests` where the two parameters are `ids` which is an array of Request ids, and `status` which is the status that all the ids will be set to
- For Batch delete backend, I'm using the endpoint `DELETE /api/requests` where there is one parameter `ids` which is an array of Request ids
- For the Batch edit and delete frontend, I saw on the Figma that there was no more dropdown on the individual rows but instead all the functionality went just to the batch dropdown. This is the functionality I implemeneted, but I am not sure if that was intended or not.

Notes on the checkboxes:
- Added @tailwindcss/forms just because checkbox styling wasn't working
- I couldn't figure out how to make the top checkbox an indeterminant, so it has a check unlike the Figma but operates just the same

Other Notes:
- There is a hydration error that pops up every now and then which I'm not exactly sure what the cause of it is, hope that is not a big issue. I turned off React Strict Mode so it (hopefully) doesn't show on the screen as an error popup.
- The cool page is mobile responsive!



