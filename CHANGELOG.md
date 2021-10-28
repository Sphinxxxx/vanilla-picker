# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).


<!---
## [Unreleased]
- ...
-->


## [2.12.1] - 2019-09-03
### Fixed
- More `exports` from `package.json`.


## [2.12.0] - 2019-09-03
### Added
- `vanilla-picker.csp.js` for sites with strict CSP settings (#45).


## [2.11.2] - 2021-01-23
### Fixed
- Updated TypeScript definitions (#38, #42).


## [2.11.0] - 2020-11-12
### Added
- TypeScript declaration (#37).


## [2.10.1] - 2019-12-29
### Added
- `options.defaultColor` (#29).

### Changed
- Clarified documentation.


## [2.10.0] - 2019-09-03
### Added
- `destroy()` (#14).


## [2.9.2] - 2019-07-23
### Fixed
- More relevant CSS prefixes.
- Transpiled ES module (#22).


## [2.9.1] - 2019-07-17
### Fixed
- Normalized CSS for `input` and `button` (#21).


## [2.9.0] - 2019-06-28
### Added
- `options.cancelButton` (#18).


## [2.8.2] - 2019-06-28
### Fixed
- Simpler mouse/touch interaction. Fixes #19.


## [2.8.1] - 2019-06-09
### Fixed
- Text field interaction.


## [2.8.0] - 2019-04-19
### Added
- Shadow DOM support (#15).

### Fixed
- Better event handling when closing the popup (#17).


## [2.7.2] - 2019-01-24
### Fixed
- Removed double `onChange` event (#11).


## [2.7.1] - 2019-01-11
### Added
- CSS vendor prefixes with Autoprefixer.

### Changed
- Updated dependencies.


## [2.7.0] - 2018-11-12
### Added
- `options.editorFormat` (#7).


## [2.6.0] - 2018-10-05
### Fixed
- Make an ES6 module that actually works.


## [2.5.3] - 2018-10-03
### Changed
- Minor documentation changes.


## [2.5.2] - 2018-09-14
### Fixed
- Focusing and mouse interaction.


## [2.5.1] - 2018-09-13
### Fixed
- Bug in `setColor()`.


## [2.5.0] - 2018-09-13
### Added
- Keyboard navigation and basic accessibility.


## [2.4.3] - 2018-09-09
### Added
- README changes.


## [2.4.2] - 2018-09-06
### Added
- js.org domain.


## [2.4.1] - 2018-09-03
### Changed
- Minor documentation changes.


## [2.4.0] - 2018-09-02
### Added
- `movePopup()`: Share a picker among multiple parents.
- **silent** flag in `setColor()` (#4).
- JSDoc documentation.


## [2.3.0] - 2018-08-16
### Added
- `onOpen`/`onClose` callbacks when the popup opens and closes.


## [2.2.1] - 2018-05-21
### Removed
- Disabled package-lock.json (https://stackoverflow.com/questions/44206782/do-i-commit-the-package-lock-json-file-created-by-npm-5).


## [2.2.0] - 2018-05-20
### Added
- Supports CSS color names as input.


## [2.1.0] - 2018-04-10
### Added
- Text field for color input.
- This CHANGELOG file.

### Changed
- Separate layout CSS for easier customization.


## [2.0.2] - 2018-04-05
### Added
- Build scripts for development.


## [2.0.1] - 2018-03-24
### Fixed
- CSS fix for Firefox (#1).


## 2.0.0 - 2018-03-24
### Major changes from https://github.com/dissimulate/Picker
- Multiple instances
- Touch support
- Enable/disable alpha
- .setColor()
- Inline styles replaced with CSS for easier customization


[Unreleased]: https://github.com/Sphinxxxx/vanilla-picker/compare/v2.12.1...HEAD
[2.12.1]:     https://github.com/Sphinxxxx/vanilla-picker/compare/v2.12.0...v2.12.1
[2.12.0]:     https://github.com/Sphinxxxx/vanilla-picker/compare/v2.11.2...v2.12.0
[2.11.2]:     https://github.com/Sphinxxxx/vanilla-picker/compare/v2.11.0...v2.11.2
[2.11.0]:     https://github.com/Sphinxxxx/vanilla-picker/compare/v2.10.1...v2.11.0
[2.10.1]:     https://github.com/Sphinxxxx/vanilla-picker/compare/v2.10.0...v2.10.1
[2.10.0]:     https://github.com/Sphinxxxx/vanilla-picker/compare/v2.9.2...v2.10.0
[2.9.2]:      https://github.com/Sphinxxxx/vanilla-picker/compare/v2.9.1...v2.9.2
[2.9.1]:      https://github.com/Sphinxxxx/vanilla-picker/compare/v2.9.0...v2.9.1
[2.9.0]:      https://github.com/Sphinxxxx/vanilla-picker/compare/v2.8.2...v2.9.0
[2.8.2]:      https://github.com/Sphinxxxx/vanilla-picker/compare/v2.8.1...v2.8.2
[2.8.1]:      https://github.com/Sphinxxxx/vanilla-picker/compare/v2.8.0...v2.8.1
[2.8.0]:      https://github.com/Sphinxxxx/vanilla-picker/compare/v2.7.2...v2.8.0
[2.7.2]:      https://github.com/Sphinxxxx/vanilla-picker/compare/v2.7.1...v2.7.2
[2.7.1]:      https://github.com/Sphinxxxx/vanilla-picker/compare/v2.7.0...v2.7.1
[2.7.0]:      https://github.com/Sphinxxxx/vanilla-picker/compare/v2.6.0...v2.7.0
[2.6.0]:      https://github.com/Sphinxxxx/vanilla-picker/compare/v2.5.3...v2.6.0
[2.5.3]:      https://github.com/Sphinxxxx/vanilla-picker/compare/v2.5.2...v2.5.3
[2.5.2]:      https://github.com/Sphinxxxx/vanilla-picker/compare/v2.5.1...v2.5.2
[2.5.1]:      https://github.com/Sphinxxxx/vanilla-picker/compare/v2.5.0...v2.5.1
[2.5.0]:      https://github.com/Sphinxxxx/vanilla-picker/compare/v2.4.3...v2.5.0
[2.4.3]:      https://github.com/Sphinxxxx/vanilla-picker/compare/v2.4.2...v2.4.3
[2.4.2]:      https://github.com/Sphinxxxx/vanilla-picker/compare/v2.4.1...v2.4.2
[2.4.1]:      https://github.com/Sphinxxxx/vanilla-picker/compare/v2.4.0...v2.4.1
[2.4.0]:      https://github.com/Sphinxxxx/vanilla-picker/compare/v2.3.0...v2.4.0
[2.3.0]:      https://github.com/Sphinxxxx/vanilla-picker/compare/v2.2.1...v2.3.0
[2.2.1]:      https://github.com/Sphinxxxx/vanilla-picker/compare/v2.2.0...v2.2.1
[2.2.0]:      https://github.com/Sphinxxxx/vanilla-picker/compare/v2.1.0...v2.2.0
[2.1.0]:      https://github.com/Sphinxxxx/vanilla-picker/compare/v2.0.2...v2.1.0
[2.0.2]:      https://github.com/Sphinxxxx/vanilla-picker/compare/v2.0.1...v2.0.2
[2.0.1]:      https://github.com/Sphinxxxx/vanilla-picker/compare/v2.0.0...v2.0.1
