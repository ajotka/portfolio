# Frontend Best Practices

Apply the following rules wherever possible, guided by common sense and general principles of writing good code.

##### The most important rules:
- Clean code (one that is understandable to another programmer or to you if you come back to him after a while).
- DRY (Don't repeat yourself)
- Standards compliant
- Accessibility & Semantic friendly

___
## General
### Formatting
- Nests - 4 spaces (not tab!)
- Each nesting includes an indentation
- We use a maximum of one white line
- One html attribute, CSS tag per line
- Remove white spaces if autowrapper adds them

### Other
- Merge files, limit the number of requests to the server (minification of CSS, JS, sprites, font icons)
- Write the code and comments in English
- Before each new project, we download the latest version of DIRK Pack

___
## HTML
#### Blocks
Separate blocks of the same depth with an empty line (except for lists, tables, meta, inline elements - strong, etc.).

```
<!--wrong-->
<main><span></span>
<section></section>
</main>
<footer></footer>

<!--good-->
<main>
    <span></span>
    <section></section>

    <section></section>
</main>

<footer></footer>
```

#### Attributes
- ID attributes must be unique
- Custom attributes start with `date-`

```
<!--wrong-->
<a some-target="main"></a>

<!--good-->
<a data-target="main"></a>
```

#### External links
Declare references to external files without `http(s)` protocols.

```
<img src="//example.com/image.jpg">
```

#### Semantic
- The code should be semantically valid, pass the test ([https://validator.w3.org/)
- `<div>` tag should only be used for elements with no semantic meaning
____

## CSS

### General
- Separate the semantic layer from the presentation
- Use classes for styling. We use styling by selectors when editing styles for the WYSIWYG editor
- Use the BEM methodology and ITCSS architecture
- Write styles with preprocessors (scss recommended)

##### Formatting
- Use short notation

```
//wrong
margin: 2px 0px 0px 3px

//good
margin: 2px 0 0 3px
```

- Use notation with hyphens to separate words
- Put a space between the selector and the parenthesis

```
//wrong
.mainsection{}

//good
.main-section {}
```

- Try to be precise

```
//wrong
.main .sidebar .list {}
* {}
div {}

//good
.main-sidebar__list {}
```

##### Layout classes
Use custom classes

```
//wrong
.header .xs-4 {
    padding: 0;
}

//good
.header__col {
    padding: 0;
}
```

##### Mobile first
Use mobile first. The DRY rule is an exception - if the mobile first approach requires too much code or makes it unreadable. Most often in the BEM modifier.
```

//wrong
.tab__title {
    border: 1px solid #000;
    margin-top: 0;
    color: #000;
    &--brand {
        border: 0;
        @indlude rwd(phone) {
            border: 1px solid #000;
        }
    }
}

//good
.tab__title {
    border: 1px solid #000;
    margin-top: 0;
    color: #000;
}

.tab__title--brand {
    @indlude rwdmax(small) {
            border: 0;
    }
}
```

### BEM
Divide the project into independent components using [BEM](http://getbem.com/naming/).

```
.block {}
.block__element {}
.block__element--modifier {}
```

- Start the division from the smallest elements (e.g. headers, buttons).
- A block may extend another, and other blocks may be nested within it.
- 1 block = 1 .scss file (except for OOCSS layout items - .container, .row).

##### Nesting
Create a maximum of one element nesting in a block, flatten the structure.

```
//wrong
.sidebar__list__element {}
.sidebar__list__element__link {}

//good
.sidebar__list-element {}
.sidebar__list-link {}
```

___
## JS

### General
- Use ES6 syntax
- Use modules (import, export)
- Use the rules found in the Style Guide Airbnb [https://github.com/airbnb/javascript]

### Structure

```
js/
    components/
    vendor/
    index.js
```

#### Modules
- The main.js file is the main application file, we import and initialize the components in it
- Components in the root directory cannot execute by itself. For example, if there is no main.js file, the JS code will not run at all.

### Plugins
There are two approaches to adding external plugins to a project. If possible use approach #1, if not possible #2, etc.
1. Install the plugin via npm, add to the component `ʻimport 'plugin';` `(Most often on the plug-in page there is information whether the plug can be added this way).
2. Add the plug-in file directly to the './js/vendor' directory

#### jQuery
- Add jQuery in the global space, do not import it in modules
- For jQuery in Wordpress projects add wp_enqueue_script
- For other projects, install it using npm and then add in 'js/vendors' (in the DIRK Pack it is commented out by default).
