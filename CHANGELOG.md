# Changelog
Thanks to this file, you will always be up-to-date on the health status of this library and stay informed about new releases, implementations, and bug fixes.

## [Version 3] - 2024-06-09

### Fixed
- Fixed a bug that exposed the `spreadsheet` parameter in the `_getTables` method belonging to the `Spreadsheet` class.

## [Version 2] - 2024-06-09

### Fixed
- Fixed some issues with error handling in methods that manage CRUD operations.

## [Version 1] - 2024-06-08
### Aggiunto
- `openDbById`: a method that allows obtaining the desired instance of the `Spreadsheet` class by extending the `_getTables` function.
- `_getTables`: a function available in instances of the `Spreadsheet` class that allows extending the `Sheet` classes, enabling the management of CRUD operations.
- Functions to manage CRUD operations.
- The Id Generator.
- The Hash Generator.
