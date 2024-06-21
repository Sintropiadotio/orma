# Changelog
Thanks to this file, you will always be up-to-date on the health status of this library and stay informed about new releases, implementations, and bug fixes.

## [Version 7] - MINOR RELEASE - 2024-06-21

### Added
- `openDb`: a method that replace the `openDbById` method which provides the ability to open databases through different methods.

### Deprecated
- `openDbById` method has been deprecated. It will be usable from version 1 to version 10, but it is recommended to start using the openDb method.

## [Version 6] - PATCH RELEASE - 2024-06-13

### Added
- Implemented custom errors in crud operations
  
## [Version 5] - PATCH RELEASE - 2024-06-13

### Fixed
- Removed redundancies in Crud Operation Functions
  
## [Version 4] - PATCH RELEASE - 2024-06-13

### Fixed
- Fixed a bug that throw error while using the _createMany method
  
## [Version 3] - PATCH RELEASE - 2024-06-09

### Fixed
- Fixed a bug that exposed the `spreadsheet` parameter in the `_getTables` method belonging to the `Spreadsheet` class.

## [Version 2] - PATCH RELEASE - 2024-06-09

### Fixed
- Fixed some issues with error handling in methods that manage CRUD operations.

## [Version 1] - MAJOR RELEASE 2024-06-08
### Added
- `openDbById`: a method that allows obtaining the desired instance of the `Spreadsheet` class by extending the `_getTables` function.
- `_getTables`: a function available in instances of the `Spreadsheet` class that allows extending the `Sheet` classes, enabling the management of CRUD operations.
- Functions to manage CRUD operations.
- The Id Generator.
- The Hash Generator.
