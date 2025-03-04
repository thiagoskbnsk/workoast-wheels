## First comments

The layout was not being changed, everything was kept with the base theme. The improvements were just did to reach the test goals, no new libs were included

#### Main files changed

1. **VehiclesList:**

Changes did here were just to show more info about the vehicle

---

2. **AdditionalFilters:**

- new filters were added: makes, classification, passengerCounts and hourly price range.
- a logic were added to get default options to fill new filters
- integration with react-hook-form to get/update field state

---

3. **FilterActiveTags:**

- show current filters applied to the vehicle lists

adds immediate feedback about the current filters applied, more user control and user experience

---

4. **FilterCheckboxGroup & FilterRadioGroup:**

- both components created are "block component" used on filter sidebar

---

#### Folder structure and best practices

Folder structure has been changed to improve organization, readability and scalability:

`/components` folder has been reorganized into three subfolders:

- **layout**: contains components responsible for the layout and structure of the application.
- **blocks**: contains reusable, self-contained components that encapsulate specific functionality, using one or more UI components.
- **ui**: contains basic UI elements and components.

`/types`: this folder was created to hold type definitions

`/lib` -> `/utils`: lib folder has been renamed to utils to better reflect its purpose of containing utility functions and helpers.

but, why? - consistency with industry standards, many projects use this convention, make it easy for new developers on onboarding process

- `/lib`: high-level, domain-specific logic that interacts with APIs, services, or external dependencies
- `/utils`: general utility functions such as formatting, calculations, etc.

**About some files:**

`index.ts` was created in some folders to simplify imports. It allows multiple components to be imported from a single location.

`form.tsx`: I realized this file had one type definition and one utility function, both were moved to a folder that make more sense:

- `FormValues` -> `/types/filter-form.ts`: this interface was being used by different files, make sense to transform it on a shared type once it doesn't have a file that is directly linked
- `combineDateTime` -> `/utils/formatters.ts`: utility function

**New improvements that could be done (in the code)**

- Some files has more than one component inside, even they are simple, would be nice to split them into other files. The main file would be more simple (readability), less imports (maintainability), files could be test individually and mocked (testability).

Eg: `VehicleList.tsx` could be turned into a folder to have the main component and the `PaginationButtons` component in different files

#### Considerations

App overall is very simple and easy to change, I had never worked with `trpc`, for me, was nice to learn something
